#include <assert.h>
#include <math.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <TChar.h>
#include "mm_jsapi.h"

#include "Serialize.h"

#define kCCBXBitBufferSize 8
#define kCCBXVersion 4

typedef enum { false, true } bool;

static char bitBuffer[kCCBXBitBufferSize];
static int currentBit;
static int currentByte;

/*****************************************************************************
 * Private functions
 ****************************************************************************/

char *allocJSString(JSContext *cx, jsval val)
{
    unsigned int stringLength;
    const unsigned short *string;
    char *outputString;
    char *cur;

    string = JS_ValueToString(cx, val, &stringLength);

    outputString = cur = (char*)malloc(stringLength+1);

    while(*string)
    {
        *cur = *string & 0xFF;
        cur++;
        string++;
    }

    *cur = '\0';

    return outputString;
}

int log2(uint64_t val)
{
    int log = 0;
    while (val >>= 1) ++log;
    return log;
}

void putBit(bool b)
{
    if (b)
    {
        bitBuffer[currentByte] |= 1 << currentBit;
    }

    currentBit++;
    if (currentBit >= 8)
    {
        currentByte++;
        currentBit = 0;
    }
}

void clearBitBuffer()
{
    int i;

    for (i = 0; i < kCCBXBitBufferSize; i++)
    {
        bitBuffer[i] = 0;
    }
    currentBit = 0;
    currentByte = 0;
}

void flushBits(FILE *outputFile)
{
    int numBytes = currentByte;
    if (currentBit != 0) numBytes++;

    fwrite(bitBuffer, sizeof(char), numBytes, outputFile);
}

void writeInt(int value, bool sign, FILE *outputFile)
{
    uint64_t number;
    int length;
    int i;

    clearBitBuffer();

    if (sign)
    {
        // Support for signed numbers
        int64_t dl = value;
        int64_t bijection;
        if (value < 0)
        {
            bijection = (-dl)*2;
        }
        else
        {
            bijection = dl*2+1;
        }
        number = bijection;
    }
    else
    {
        // Support for 0
        number = value + 1;
    }

    assert(number > 0);

    length = log2(number);

    // Write number of bits used
    for (i = 0; i < length; i++)
    {
        putBit(false);
    }
    putBit(true);

    // Write out the actual number
    for (i = length - 1; i >= 0; i--)
    {
        if (number & 1 << i)
        {
            putBit(true);
        }
        else
        {
            putBit(false);
        }
    }
    flushBits(outputFile);
}

void writeBool(bool b, FILE *outputFile)
{
    unsigned char bytes[1];

    if (b)
    {
        bytes[0] = 1;
    }
    else
    {
        bytes[0] = 0;
    }

    fwrite(bytes, sizeof(char), 1, outputFile);
}

/*****************************************************************************
 * Public functions
 ****************************************************************************/

JSBool openFile(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    FILE *outputFile;
    unsigned int stringLength;
    char *filename;

    if (argc != 1)
    {
		return JS_FALSE;
    }

    filename = allocJSString(cx, argv[0]);
    outputFile = fopen(filename, "wb");
    free(filename);

    if (outputFile != NULL)
    {
        *rval = JS_ObjectToValue(outputFile);
        return JS_TRUE;
    }
    else
    {
        return JS_FALSE;
    }
}

JSBool writeHeader(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    FILE *outputFile;
    char header[4] = {'i', 'b', 'c', 'c'};

    if (argc != 1)
    {
		return JS_FALSE;
    }

    outputFile = (FILE *)argv[0];

    // Write magic header string
    rewind(outputFile);
    fwrite(header, sizeof(char), 4, outputFile);

    // Write version number
    writeInt(kCCBXVersion, false, outputFile);

    // Write javascript control status
    writeBool(false, outputFile);

    if (outputFile != NULL)
    {
        *rval = JS_ObjectToValue(outputFile);
        return JS_TRUE;
    }
    else
    {
        return JS_FALSE;
    }
}

JSBool closeFile(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    FILE *outputFile;

    if (argc != 1)
    {
        return JS_FALSE;
    }

    outputFile = (FILE *)argv[0];

    if (fclose(outputFile) == 0)
    {
        return JS_TRUE;
    }
    else
    {
        return JS_FALSE;
    }
}

// MM_STATE is a macro that expands to some definitions that are
// needed in order interact with Flash.  This macro must be
// defined exactly once in your library
MM_STATE

// Flash calls MM_Init when your library is loaded
void MM_Init()
{
    JS_DefineFunction(_T("openFile"), openFile, 0);
    JS_DefineFunction(_T("writeHeader"), writeHeader, 1);
    JS_DefineFunction(_T("closeFile"), closeFile, 1);
}

void MM_Terminate()
{
	// clean up memory here
}