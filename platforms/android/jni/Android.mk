LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE := core_shared

LOCAL_MODULE_FILENAME := libcore

LOCAL_SRC_FILES := application.cpp \
                   ../../../../cocos2d-tooflya-sdk/Classes/AppDelegate.cpp \
                   ../../../../cocos2d-android-library/native/support/Screenshot.cpp 

LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../../../cocos2d-tooflya-sdk/Classes \
                    $(LOCAL_PATH)/../../../../cocos2d-android-library/native/support

LOCAL_STATIC_LIBRARIES := cocos2d_js_static

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=1

include $(BUILD_SHARED_LIBRARY)

$(call import-module,scripting/js-bindings/proj.android) 
