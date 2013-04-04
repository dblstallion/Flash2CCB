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

    for (i = 0; i < length; i++)
    {
        putBit(false);
    }
    putBit(true);

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

    rewind(outputFile);
    fwrite(header, sizeof(char), 4, outputFile);

    writeInt(4, false, outputFile);

    // TODO: Append isJSControlled? boolean.

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

JSBool writeStringCache(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    // TODO: Implement this.
}

JSBool writeSequences(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    // TODO: Implement this.
}

JSBool writeNodeGraph(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    // TODO: Implement this.
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

// A sample function
// Every implementation of a Javascript function must have this signature
JSBool computeSum(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
	long a, b, sum;

	// Make sure the right number of arguments were passed in
	if (argc != 2)
    {
		return JS_FALSE;
    }

	// Convert the two arguments from jsvals to longs
	if (JS_ValueToInteger(cx, argv[0], &a) == JS_FALSE || JS_ValueToInteger(cx, argv[1], &b) == JS_FALSE)
    {
		return JS_FALSE;
    }

	// Perform the actual work
	sum = a + b;

	// Package the return value as a jsval
	*rval = JS_IntegerToValue(sum);

	// Indicate success
	return JS_TRUE;
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
    JS_DefineFunction(_T("writeStringCache"), writeStringCache, 1);
    JS_DefineFunction(_T("writeSequences"), writeSequences, 1);
    JS_DefineFunction(_T("writeNodeGraph"), writeNodeGraph, 1);
    JS_DefineFunction(_T("closeFile"), closeFile, 1);

	// sample function
	JS_DefineFunction(_T("computeSum"),	computeSum,	2);
}

void MM_Terminate()
{
	// clean up memory here
}