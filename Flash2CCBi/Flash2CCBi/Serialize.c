#include <TChar.h>
#include "mm_jsapi.h"

#include "Serialize.h"

// A sample function
// Every implementation of a Javascript function must have this signature
JSBool computeSum(JSContext *cx, JSObject *obj,  unsigned int argc,   jsval *argv, jsval *rval)
{
	long a, b,  sum;

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
	// sample function
	JS_DefineFunction(_T("computeSum"),	computeSum,	2);
}

void MM_Terminate()
{
	// clean up memory here
}