#define DLL_EXPORT __declspec(dllexport)

DLL_EXPORT JSBool openFile(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeHeader(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeStringCache(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeSequences(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeNodeGraph(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool closeFile(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);

// sample function
DLL_EXPORT JSBool computeSum(JSContext *cx, JSObject *obj,  unsigned int argc,   jsval *argv, jsval *rval);