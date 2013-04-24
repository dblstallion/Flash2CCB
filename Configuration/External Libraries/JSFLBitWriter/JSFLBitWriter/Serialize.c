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

enum {
    kCCBXFloat0 = 0,
    kCCBXFloat1,
    kCCBXFloatMinus1,
    kCCBXFloat05,
    kCCBXFloatInteger,
    kCCBXFloatFull
};

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

void putBit(JSBool b)
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

void _writeInt(int value, JSBool sign, FILE *outputFile)
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
        putBit(JS_FALSE);
    }
    putBit(JS_TRUE);

    // Write out the actual number
    for (i = length - 1; i >= 0; i--)
    {
        if (number & 1i64 << i)
        {
            putBit(JS_TRUE);
        }
        else
        {
            putBit(JS_FALSE);
        }
    }
    flushBits(outputFile);
}

void _writeBool(JSBool b, FILE *outputFile)
{
    fputc(b ? 1 : 0, outputFile);
}

void _writeByte(unsigned char character, FILE *outputFile)
{
    fputc(character, outputFile);
}

void _writeFloat(float value, FILE *outputFile)
{
    unsigned char type;

    if (value == 0.0f)
    {
        type = kCCBXFloat0;
    }
    else if (value == 1.0f)
    {
        type = kCCBXFloat1;
    }
    else if (value == -1.0f)
    {
        type = kCCBXFloatMinus1;
    }
    else if (value == 0.5f)
    {
        type = kCCBXFloat05;
    }
    else if ((float)((int)value) == value)
    {
        type = kCCBXFloatInteger;
    }
    else
    {
        type = kCCBXFloatFull;
    }

    _writeByte(type, outputFile);

    if (type == kCCBXFloatInteger)
    {
        _writeInt((int)value, JS_TRUE, outputFile);
    }
    else if (type == kCCBXFloatFull)
    {
        fwrite(&value, sizeof(float), 1, outputFile);
    }
}

void _writeString(char *string, FILE *outputFile)
{
    size_t length = strlen(string);

    assert(length <= 0xFFFF);

    fputc((length >> 8) & 0xFF, outputFile);
    fputc(length & 0xFF, outputFile);

    fwrite(string, sizeof(char), length, outputFile);
}

FILE *JS_ValueToFile(jsval val)
{
    return (FILE *)val;
}

/*****************************************************************************
 * Public functions
 ****************************************************************************/

JSBool openFile(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    FILE *outputFile;
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

JSBool writeFloat(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    FILE *outputFile;
    double value;

    if (argc != 2)
    {
        return JS_FALSE;
    }

    outputFile = JS_ValueToFile(argv[1]);
    if (outputFile != NULL)
    {
        if (JS_ValueToDouble(cx, argv[0], &value) == JS_TRUE)
        {
            _writeFloat((float)value, outputFile);
            return JS_TRUE;
        }
    }

    // Should not get here...
    return JS_FALSE;
}

JSBool writeInt(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    FILE *outputFile;
    long value;

    if (argc != 2)
    {
        return JS_FALSE;
    }

    outputFile = JS_ValueToFile(argv[1]);
    if (outputFile != NULL)
    {
        if (JS_ValueToInteger(cx, argv[0], &value) == JS_TRUE)
        {
            _writeInt(value, JS_TRUE, outputFile);
            return JS_TRUE;
        }
    }

    // Should not get here...
    return JS_FALSE;
}

JSBool writeUInt(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    FILE *outputFile;
    long value;

    if (argc != 2)
    {
        return JS_FALSE;
    }

    outputFile = JS_ValueToFile(argv[1]);
    if (outputFile != NULL)
    {
        if (JS_ValueToInteger(cx, argv[0], &value) == JS_TRUE)
        {
            _writeInt(value, JS_FALSE, outputFile);
            return JS_TRUE;
        }
    }

    // Should not get here...
    return JS_FALSE;
}

JSBool writeBool(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    FILE *outputFile;
    JSBool value;

    if (argc != 2)
    {
        return JS_FALSE;
    }

    outputFile = JS_ValueToFile(argv[1]);
    if (outputFile != NULL)
    {
        if (JS_ValueToBoolean(cx, argv[0], &value) == JS_TRUE)
        {
            _writeBool(value, outputFile);
            return JS_TRUE;
        }
    }

    // Should not get here...
    return JS_FALSE;
}

JSBool writeByte(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    FILE *outputFile;
    long value;

    if (argc != 2)
    {
        return JS_FALSE;
    }

    outputFile = JS_ValueToFile(argv[1]);
    if (outputFile != NULL)
    {
        if (JS_ValueToInteger(cx, argv[0], &value) == JS_TRUE)
        {
            _writeByte((unsigned char)value, outputFile);
            return JS_TRUE;
        }
    }

    // Should not get here...
    return JS_FALSE;
}

JSBool writeString(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval)
{
    FILE *outputFile;
    char *value;

    if (argc != 2)
    {
        return JS_FALSE;
    }

    outputFile = JS_ValueToFile(argv[1]);
    if (outputFile != NULL)
    {
        value = allocJSString(cx, argv[0]);
        _writeString(value, outputFile);
        free(value);
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
    JS_DefineFunction(_T("closeFile"), closeFile, 1);
    JS_DefineFunction(_T("writeFloat"), writeFloat, 2);
    JS_DefineFunction(_T("writeInt"), writeInt, 2);
    JS_DefineFunction(_T("writeUInt"), writeUInt, 2);
    JS_DefineFunction(_T("writeBool"), writeBool, 2);
    JS_DefineFunction(_T("writeByte"), writeByte, 2);
    JS_DefineFunction(_T("writeString"), writeString, 2);
}

void MM_Terminate()
{
	// clean up memory here
}