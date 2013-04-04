#define DLL_EXPORT __declspec(dllexport)

DLL_EXPORT JSBool openFile(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeHeader(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool closeFile(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);