#define DLL_EXPORT __declspec(dllexport)

DLL_EXPORT JSBool openFile(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool closeFile(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeFloat(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeInt(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeUInt(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeBool(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeByte(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
DLL_EXPORT JSBool writeString(JSContext *cx, JSObject *obj, unsigned int argc, jsval *argv, jsval *rval);
