package com.autosendermichaelyoon;
import android.app.Application;

import com.autosendermichaelyoon.DirectSmsModule;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.picker.RNCPickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.voximplant.foregroundservice.VIForegroundServicePackage;
import com.supersami.foregroundservice.ForegroundServicePackage;
import com.voximplant.foregroundservice.VIForegroundServicePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.asterinet.react.bgactions.BackgroundActionsPackage;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new LinearGradientPackage(),
                    new ReactVideoPackage(),
                    new SplashScreenReactPackage(),
                    new SnackbarPackage(),
                    new RNCPickerPackage(),
                    new ReactNativeFirebaseAppPackage(),
                    new ReactNativeFirebaseAuthPackage(),
                    new RNLocationPackage(),
                    new VIForegroundServicePackage(),
                    new ForegroundServicePackage(),
                    new MapsPackage(),
                    new RNFusedLocationPackage(),
                    new BackgroundActionsPackage(),
                    new BackgroundTimerPackage(),
                    new ReactNativeContacts(),
                    new RNDateTimePickerPackage(),
                    new VectorIconsPackage(),
                    new RNGestureHandlerPackage(),
                    new RNScreensPackage(),
                    new SafeAreaContextPackage(),
                    new AsyncStoragePackage(),
                    new DirectSmsPackage()
            );

        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}