#define DLL_EXPORT __declspec(dllexport)

DLL_EXPORT JSBool computeSum(JSContext *cx, JSObject *obj,  unsigned int argc,   jsval *argv, jsval *rval);