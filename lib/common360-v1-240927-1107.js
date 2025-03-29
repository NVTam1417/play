
/* global SwipeUp */
var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null;
var isiPhone = navigator.userAgent.match(/iPhone|iPod/i) != null;
//baidu
var isBaidu = navigator.userAgent.match('baidu') != null;
//QQ browser
var isQQ = navigator.userAgent.match('MQQBrowser') != null;
//Saferi Browser
var isFirefox = navigator.userAgent.match('FxiOS') != null;
// UC Browser
var isUC = navigator.userAgent.indexOf("UCBrowser") != -1;
// Chrome 1+
var isChrome = navigator.userAgent.match('CriOS') != null;
//xiaomi
var isXiaomi = navigator.userAgent.match('XiaoMi') != null;
// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari = navigator.userAgent.match('Safari') && !isBaidu && !isFirefox && !isQQ && !isChrome && !isUC && !isXiaomi;
var isAndroid = /android/i.test(navigator.userAgent || navigator.vendor || window.opera);
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var loadOver = false;//是否加载完毕
var swipeUp;
var handImage;
var divFullscreen;
var enterFullscreenBtn;
var exitFullscreenBtn;
var isLandscapeCanvas = false; // in game orientation
var maxHeightLandscape = 0;
// var isShowWarning = false;
var isFullScreenIOS;
var divWarningUserRotate;
var intervalCheckSize;
var lastWindowHeight;
var isIphoneX = (window.screen.height / window.screen.width) > 2;
var isKeyboardShow = false;
// var innerSize = { width: window.innerWidth, height: window.innerHeight };
var splash = document.getElementById('splash');
var splashGamePortrait = document.getElementById('splashGamePortrait');
var checkFullscreenInterval;
var frameInterval;
var notScrollCount = 0;
var heighOffsetToFS = 23;
var iOsVersion;
var isAutoOrientationGame;
var gameSettings;
var splashImage;
var gameCanvas = document.getElementById('GameCanvas');
var loadingIcon = document.getElementById('loadingIcon');
var bodyHeight = "100%";
var divIOSFullscreenManual;
var bgFullscreenPanel;
var manualTitle;
var portraitManualDesc;
var bgFullscreenBlock;
var sideBar;
var landscapeManualGif;
var landscapeManualFrame;
var portraitManualGif;
var portraitManualFrame;
var closeManualBtn;
var canClickOverlay;
var hiddenPopUpDayLimit = 7;
var currentLanguage;
var rotatingGif;
var textWarning;
var timeOutScrollTo;
var timeOutAlignCanvas;
var timeOutManualOrientationChange = -1;
var maskEnableTimeOut = -1;
var isPortraitGame = function () {
    var canvasDesignResolutionSize = cc.view.getDesignResolutionSize();
    if (canvasDesignResolutionSize && canvasDesignResolutionSize.width > 0 && canvasDesignResolutionSize.height > 0) {
        return canvasDesignResolutionSize.width < canvasDesignResolutionSize.height;
    }
    if (gameSettings) {
        return (gameSettings.screen.orientation === "portrait");
    }
    if (window._CCSettings) {
        return window._CCSettings.screen.orientation === "portrait";
    }
    return false;
}

if (splash) {
    splash.style.opacity = 0;
}

window["commonUnitTest"] = this;

function setupSplash(settings) {
    gameSettings = settings;
    window.addEventListener('orientationchange', onOrientationChanged);
    window.visualViewport.addEventListener('resize', onResized);
    window.addEventListener('resize', onWindowResized);
    isAutoOrientationGame = settings && settings.screen.orientation === "";
    splash.style.display = 'block';
    if (typeof loadingIcon !== 'undefined' && loadingIcon != null && isPortraitGame()) {
        loadingIcon.style.display = 'block';
    }
    splashImage = new Image();
    splashImage.src = "splashscreen.jpg";
    splashImage.onload = function () {
        updateSplashSize();
        splash.style.opacity = 1;
    }
    if (typeof gameCanvas !== undefined) {
        gameCanvas.style.opacity = 0;
    }
    updateSplashRotation();
}

function updateSplashSize() {
    var bgWidth = splashImage.naturalWidth;
    var bgHeight = splashImage.naturalHeight;
    var isLandscape = isMobile ? isLandscapeScreen() : true;
    var screenWidth = isLandscape ? window.innerWidth : window.innerHeight;
    var screenHeight = isLandscape ? window.innerHeight : window.innerWidth;
    var screenRatio = screenHeight / screenWidth;
    var designWidth = 1560;
    var designHeight = 720;
    if (gameSettings && gameSettings.screen.designResolution) {
        designWidth = gameSettings.screen.designResolution.width;
        designHeight = gameSettings.screen.designResolution.height;
    }
    var _ratio = 1;
    if (isPortraitGame()) {
        if (isMobile) {
            screenWidth = (!isLandscape) ? document.documentElement.clientWidth : document.documentElement.clientHeight;
            screenHeight = (!isLandscape) ? document.documentElement.clientHeight : document.documentElement.clientWidth;
        }
        var scaleHeightDevice = screenHeight / designHeight;
        var scaleWidthDevice = screenWidth / designHeight;
        var realScaleDevice = scaleHeightDevice > scaleWidthDevice ? scaleWidthDevice : scaleHeightDevice;
        var convertWidthBG = bgWidth * realScaleDevice;
        var convertHeightBG = bgHeight * realScaleDevice;
        var ratioW = screenWidth / convertWidthBG;
        var ratioH = screenHeight / convertHeightBG;
        _ratio = (ratioW > ratioH) ? ratioW : ratioH;
        _ratio = _ratio * scaleHeightDevice;
        if (isMobile) {
            _ratio = (screenHeight / bgHeight) * (screenHeight / screenWidth);
        }
    } else {
        var fitWidth = screenRatio > designHeight / designWidth;
        _ratio = fitWidth ? screenWidth / designWidth : screenHeight / designHeight;
    }
    splash.style.backgroundSize = (bgWidth * _ratio) + 'px ' + (bgHeight * _ratio) + 'px';
    splash.style.width = screenWidth + 'px';
    splash.style.height = screenHeight + 'px';
}

function updateSplashRotation() {
    var ratio = window.innerHeight / window.innerWidth * 50;
    splash.classList.remove("splashPortrait");
    splash.classList.remove("splashPortraitForGamePortrait");
    if (splashGamePortrait) {
        splashGamePortrait.classList.remove("splashPortrait");
        splashGamePortrait.classList.remove("splashPortraitForGamePortrait");
    }
    if (window.innerWidth < window.innerHeight && isMobile && !isPortraitGame()) {
        ratio = window.innerWidth / window.innerHeight * 50;
        splash.classList.add("splashPortrait");
        splash.style.transformOrigin = ratio + '% 50%';
    } else if (window.innerWidth > window.innerHeight && isMobile && (isPortraitGame() || isAutoOrientationGame)) {
        var _ratio = window.innerWidth / window.innerHeight * 50;
        splash.classList.add("splashPortrait");
        splash.style.transformOrigin = _ratio + '% 50%';
        if (splashGamePortrait) {
            splashGamePortrait.classList.add("splashPortraitForGamePortrait");
            splashGamePortrait.style.transformOrigin = '50% ' + ratio + '%';
        }
    }
}

function isLandscapeScreen() {
    if (isMobile) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            return true;
        }
        if (window.matchMedia("(orientation: portrait)").matches) {
            return false;
        }
    }
    return true;
}

function listenCallBack() {
    if (!splash) {
        splash = document.getElementById('splash');
    }
    var isLandscape = isLandscapeScreen();
    // console.log("==== Landscape is : "+ isLandscape);
    var mask = document.getElementById('mask');
    if (loadOver && typeof splash !== 'undefined') {
        splash.style.display = 'none';
        if (typeof loadingIcon !== 'undefined' && loadingIcon != null && isPortraitGame()) {
            loadingIcon.style.display = 'none';
        }
    }

    var canvasDesignResolutionSize = gameSettings ? gameSettings.screen.designResolution : cc.view.getDesignResolutionSize();
    if (canvasDesignResolutionSize) {
        isLandscapeCanvas = canvasDesignResolutionSize.width > canvasDesignResolutionSize.height;
    }

    var urlRuFS = new URL(window.location);
    var disableFullscreen = urlRuFS.searchParams.get('disableFullscreen');

    if (isMobile && isAndroid && isLandscapeCanvas && !disableFullscreen) {
        if (typeof divFullscreen !== 'undefined') {
            divFullscreen.style.display = "block";
            divFullscreen.style.visibility = "visible";
        }
    } else {
        if (typeof divFullscreen !== 'undefined') {
            divFullscreen.style.display = "none";
            divFullscreen.style.visibility = "hidden";
        }
    }

    if (!isMobile) {
        updateSplashSize();
    }

    // if (isiPhone) {
    //     setTimeout(function () {
    //         if (!isKeyboardShow) {
    //             window.scrollTo(0, 1);
    //             checkViewIOS();
    //         }
    //         // if(isSafari && iOsVersion >= 15) {
    //         //     var _isFullScreen = isFullScreenSafariIOS();
    //         //     showIOSFullScreenManual(!_isFullScreen);
    //         // }
    //     }, 100);
    // }
    // ! just for game portrait
    if (isMobile && isPortraitGame()) {
        if (isLandscape) {
            setTimeout(function () {
                showWarningUserRotate();
                if (isSafari && iOsVersion < 15) {
                    if (!isFullScreenSafariIOS()) {
                        alignGameCanvasWithScreen(100);
                        alignGameCanvasWithScreen(500);
                        setTimeout(function () {
                            window.scrollTo(0, 0);
                            updateAdaptResult();
                        }, 400);
                    }
                }
            }, 500);
        } else {
            showWarningUserRotate();
        }
    }

    else if (isiPhone && isLandscape && isLandscapeCanvas && !isPortraitGame()) {
        if (isSafari) {
            setTimeout(function () {
                var _isFullScreen = isFullScreenSafariIOS();
                if (iOsVersion < 14.2) {
                    if (_isFullScreen) {
                        if (typeof mask !== 'undefined') {
                            mask.style.display = 'none';
                        }
                        if (typeof swipeUp !== 'undefined') {
                            swipeUp.disable();
                        }
                    } else {
                        if (typeof mask !== 'undefined') {
                            mask.style.display = 'block';
                        }
                        if (typeof swipeUp !== 'undefined') {
                            swipeUp.enable();
                        }
                    }
                } else {
                    onIOSFullscreenChanged(_isFullScreen);
                    // if (iOsVersion < 15){
                    //     onIOSFullscreenChanged(_isFullScreen);
                    // }else {
                    //     if (typeof swipeUp !== 'undefined') {
                    //         swipeUp.disable();
                    //     }
                    //     if (typeof mask !== 'undefined') {
                    //         mask.style.display = 'none';
                    //     }
                    // }
                }
            }, 100);
        } else if (isChrome && isiPhone
            && iOsVersion > 12) {
            setTimeout(function () {
                onIOSFullscreenChanged(isFullscreenChromeIOS());
            }, 100);

            // if (!isShowWarning) {
            //     isShowWarning = true;
            //     showWarningUserLockScreen();
            // }
        }
    } else {
        if (typeof swipeUp !== 'undefined') {
            swipeUp.disable();
        }
        if (typeof mask !== 'undefined') {
            mask.style.display = 'none';
        }
    }

    if (isMobile && isAndroid && isLandscapeCanvas) {
        setTimeout(function () {
            if (isLandscape) {
                // Landscape Orientation
                if (typeof enterFullscreenBtn !== 'undefined') {
                    enterFullscreenBtn.classList.remove("enterFullScreen_Landscape");
                    enterFullscreenBtn.classList.remove("enterFullScreen_Portrait");
                    enterFullscreenBtn.classList.add("enterFullScreen_Landscape");
                }

                if (typeof exitFullscreenBtn !== 'undefined') {
                    enterFullscreenBtn.classList.remove("exitFullScreen_Landscape");
                    enterFullscreenBtn.classList.remove("exitFullScreen_Portrait");
                    exitFullscreenBtn.classList.add("exitFullscreen_Landscape");
                }
            }
            else {
                // Portrait Orientation
                if (typeof enterFullscreenBtn !== 'undefined') {
                    enterFullscreenBtn.classList.remove("enterFullScreen_Portrait");
                    enterFullscreenBtn.classList.remove("enterFullScreen_Landscape");
                    enterFullscreenBtn.classList.add("enterFullScreen_Portrait");
                }

                if (typeof exitFullscreenBtn !== 'undefined') {
                    exitFullscreenBtn.classList.remove("exitFullScreen_Landscape");
                    exitFullscreenBtn.classList.remove("exitFullScreen_Portrait");
                    exitFullscreenBtn.classList.add("exitFullScreen_Portrait");
                }
            }
        }, 10);
    }
    if (isPortraitGame()) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.height = '100vh';
    }
    else if (isMobile && !isPortraitGame()) {
        document.body.style.overflow = "auto";
        document.body.style.position = "absolute";
        document.body.style.height = '110vh';
    }
    if (cc.sys.OS.IOS === cc.sys.os && cc.sys.isMobile) {
        if (document.body.style.height != "100%") {
            bodyHeight = document.body.style.height;
        }
        if (window.orientation == 0 || (window.outerHeight - window.innerHeight) <= heighOffsetToFS) {
            document.body.style.height = bodyHeight;
            console.log('window.innerHeight=', window.innerHeight, ' document.body.style.height=', document.body.style.height);
        } else {
            document.body.style.height = "100%";
        }
    };
    if (isMobile && isSafari) {
        callManualOrientationEvent(200);
    }
}

function isFullScreenSafariIOS() {
    var isLandscape = isLandscapeScreen();
    console.log('isFullScreenSafariIOS isLandscape=', isLandscape, ' iOsVersion=', iOsVersion
        , ' window.innerHeight=', window.innerHeight, ' document.documentElement.clientHeight=', document.documentElement.clientHeight
        , ' window.outerHeight=', window.outerHeight
    );
    isFullScreenIOS = false;
    if (iOsVersion < 14.2) {
        if (window.innerHeight == document.documentElement.clientHeight) {
            isFullScreenIOS = true;
            console.log('isFullScreenIOS true 1');
        }
    } else {
        if (window.innerHeight == window.outerHeight) {
            //absolute fullscreen
            isFullScreenIOS = true;
            console.log('isFullScreenIOS true 2');
        } else {
            if (window.innerHeight == document.documentElement.clientHeight) {
                if ((isLandscape && window.outerHeight - window.innerHeight < 30) || (!isLandscape && window.outerHeight - window.innerHeight < 100)) {
                    isFullScreenIOS = true;
                    console.log('isFullScreenIOS true 3');
                }
            }
        }
    }
    return isFullScreenIOS;
}

function isFullscreenChromeIOS() {
    isFullScreenIOS = false;
    if (window.innerHeight == window.outerHeight) {
        //absolute fullscreen
        isFullScreenIOS = true;
    } else {
        if (window.outerHeight - window.innerHeight <= heighOffsetToFS) {
            //minimal top bar fullscreen
            isFullScreenIOS = true;
        }
    }
    return isFullScreenIOS;
}

function onIOSFullscreenChanged(isFullscreen) {
    if (isKeyboardShow && isChrome) return;
    var mask = document.getElementById('mask');
    if (!isFullscreen) {
        document.body.style.overflow = "auto";
        document.body.style.height = isSafari ? '110vh' : '150vh';
        if (typeof mask !== 'undefined') {
            mask.style.display = 'block';
            mask.style.opacity = 0;
            if (maskEnableTimeOut !== -1) {
                clearTimeout(maskEnableTimeOut);
            }
            maskEnableTimeOut = setTimeout(function () {
                mask.style.opacity = 0.5;
                maskEnableTimeOut = -1;
            }, 100);
        }
        if (typeof swipeUp !== 'undefined') {
            swipeUp.enable();
        }
        window.scrollTo(0, -100);
        if (!isChrome) return;
        if (checkFullscreenInterval) {
            clearInterval(checkFullscreenInterval);
        }
        if (frameInterval) {
            clearInterval(frameInterval);
        }
        checkFullscreenInterval = setInterval(checkFullScreenChromeIOS, 100);

        frameInterval = setInterval(updateFrame, 100);
    }
    else {
        if (typeof mask !== 'undefined') {
            if (maskEnableTimeOut !== -1) {
                clearTimeout(maskEnableTimeOut);
                maskEnableTimeOut = -1;
            }
            mask.style.display = 'none';
            mask.style.opacity = 0;
        }
        if (typeof swipeUp !== 'undefined') {
            swipeUp.disable();
        }
        if (timeOutScrollTo) {
            clearTimeout(timeOutScrollTo);
            timeOutScrollTo = null;
        }
        window.scrollTo(0, 0);
        alignGameCanvasWithScreen(100);
        notScrollCount = 0;
    }
}

function onTouchEnded() {
    if (isSafari || isChrome) {
        if (timeOutScrollTo) {
            clearTimeout(timeOutScrollTo);
        }
        if (!isFullScreenIOS) {
            timeOutScrollTo = setTimeout(windowScrollToEdge, 400);
        } else {
            timeOutScrollTo = setTimeout(windowScrollToEdge, 100);
        }
    }
}

function windowScrollToEdge() {
    window.scrollTo(0, (isFullScreenIOS) ? 0 : -100);
    timeOutScrollTo = null;
}

function onScroll() {
    notScrollCount = 0;
    if (!checkFullscreenInterval) {
        checkFullscreenInterval = setInterval(checkFullScreenChromeIOS, 50);
    }
    if (!frameInterval) {
        frameInterval = setInterval(updateFrame, 50);
    }
}

function onWindowResized() {
    listenCallBack();
}

function checkFullScreenChromeIOS() {
    if (isKeyboardShow && isChrome) return;
    if (notScrollCount > 2) {
        if ((window.outerHeight - window.innerHeight) <= heighOffsetToFS) {
            setTimeout(function () {
                onIOSFullscreenChanged(true);
            }, 10);

            setTimeout(function () {
                if (checkFullscreenInterval) {
                    clearInterval(checkFullscreenInterval);
                    checkFullscreenInterval = false;
                }
                if (frameInterval) {
                    clearInterval(frameInterval);
                    frameInterval = false;
                }
            }, 300);
        } else {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 100);
        }
    }
}

function updateFrame() {
    notScrollCount++;
}

function showWarningUserLockScreen() {
    var warningText = document.createElement('div');
    document.body.appendChild(warningText);
    var str = getLocalizedDescContent("warningUserLockScreen");
    warningText.innerHTML = str ? str : "Vui lòng khoá xoay màn hình hoặc sử dụng trình duyệt Safari để có trải nghiệm chơi game tốt nhất!";
    warningText.style.display = "flex";
    warningText.style.justifyContent = "center";
    warningText.style.alignItems = "center";
    warningText.style.height = "15%";
    warningText.style.textAlign = "center";
    warningText.style.pointerEvents = "none";
    warningText.style.position = "fixed";
    warningText.style.top = "40%";
    warningText.style.left = "5%";
    warningText.style.right = "5%";
    warningText.style.bottom = "0px";

    warningText.style.zIndex = 1000;
    warningText.style.backgroundColor = "white";
    warningText.style.borderRadius = "15px";
    warningText.style.border = "2px solid #4a4a49";
    warningText.style.fontSize = "20px";
    warningText.style.color = "#4a4a49";
    warningText.style.overflow = "hidden";


    warningText.style.opacity = "0";
    warningText.style.transition = "opacity 1s"; // animation fade

    setTimeout(function () { // fadeIn
        warningText.style.opacity = "1";
    }, 10);

    setTimeout(function () { // fadeOut
        warningText.style.opacity = "0";
    }, 4000);
}

function showWarningUserRotate() {
    var shouldShowWarning = isAndroid ? window.orientation !== 0 : true;
    if (isLandscapeScreen() && shouldShowWarning) {
        if (!divWarningUserRotate) {
            divWarningUserRotate = document.createElement("div");
            document.body.appendChild(divWarningUserRotate);
            divWarningUserRotate.style.position = "fixed";
            divWarningUserRotate.style.flexDirection = "collumn";
            divWarningUserRotate.style.top = "0px";
            divWarningUserRotate.style.left = "0px";
            divWarningUserRotate.style.width = "100vw";
            divWarningUserRotate.style.height = "100vh";
            divWarningUserRotate.style.overflow = "hidden";
            divWarningUserRotate.style.zIndex = 10000;
            divWarningUserRotate.style.backgroundColor = "black";
            divWarningUserRotate.style.opacity = "0.85";

            textWarning = document.createElement("div");
            divWarningUserRotate.appendChild(textWarning);
            textWarning.style.padding = "5px 10px";
            textWarning.style.textAlign = "center";
            var str = getLocalizedDescContent("warningUserRotate");
            textWarning.innerHTML = str ? str : "Vui lòng xoay màn hình</br>để tiếp tục chơi game!";
            textWarning.style.fontSize = "20px";
            textWarning.style.color = "white";
            textWarning.style.position = "fixed";
            textWarning.style.width = "100%";
            rotatingGif = new Image();
            rotatingGif.src = 'RotatePhone.gif';
            divWarningUserRotate.appendChild(rotatingGif);
            rotatingGif.style.position = "fixed";
            rotatingGif.style.display = "block";
            rotatingGif.style.zIndex = 10001;
            rotatingGif.style.width = "120px";
            rotatingGif.style.height = "120px";
            rotatingGif.style.opacity = "0.85";
        }
        var landscapeInnerHeight = Math.min(window.innerHeight, window.innerWidth);
        var landscapeInnerWidth = Math.max(window.innerHeight, window.innerWidth);
        var topPos = landscapeInnerHeight / 2 - 120 / 2;
        rotatingGif.style.top = topPos + "px";
        var leftPos = landscapeInnerWidth / 2 - 120 / 2;
        rotatingGif.style.left = leftPos + "px";
        textWarning.style.top = landscapeInnerHeight / 2 + 60 + "px";
        divWarningUserRotate.style.display = loadOver ? "block" : "none";
        document.body.style.position = "fixed";
    } else {
        if (!isPortraitGame()) {
            document.body.style.position = "absolute";
        }
        if (divWarningUserRotate) {
            divWarningUserRotate.style.display = "none";
        }
    }
}

function showIOSFullScreenManual(isShow) {
    canClickOverlay = false;
    var isLandscape = isLandscapeScreen();
    if (!isShow) {
        var key = "manual_" + (!isPortraitGame() ? "landscape" : "portrait");
        saveToLocalStorage(key, "closed");
        var currentTime = new Date();
        var savedTime = currentTime.getTime();
        saveToLocalStorage("savedTime_" + (!isPortraitGame() ? "landscape" : "portrait"), savedTime);
    }
    var shouldShow = isShow && (isLandscape && !isPortraitGame());
    if (shouldShow) {
        var key = "manual_" + (!isPortraitGame() ? "landscape" : "portrait");
        var manualShowingStatus = loadFromLocalStorage(key);
        var lastSavedTime = loadFromLocalStorage("savedTime_" + (!isPortraitGame() ? "landscape" : "portrait"));
        var dur = getDurationFromLastTime(lastSavedTime || 0);
        var durInDay = dur / 1000 / 60 / 60 / 24;
        var enoughHiddenTime = durInDay >= hiddenPopUpDayLimit;
        if (manualShowingStatus == "closed" && !enoughHiddenTime) return;
        loadFullscreenAssets();
        updateManualAreaSize();
        divIOSFullscreenManual.style.display = "block";
        document.body.style.overflow = "hidden";
        setTimeout(function () {
            canClickOverlay = true;
        }, 2000);
    } else {
        if (divIOSFullscreenManual) divIOSFullscreenManual.style.display = "none";
    }
}

function loadFullscreenAssets() {
    if (!divIOSFullscreenManual) {
        divIOSFullscreenManual = document.createElement("div");
        document.body.appendChild(divIOSFullscreenManual);
        divIOSFullscreenManual.style.position = "fixed";
        divIOSFullscreenManual.style.display = "block";
        divIOSFullscreenManual.style.flexDirection = "collumn";
        divIOSFullscreenManual.style.top = "0px";
        divIOSFullscreenManual.style.left = "0px";
        divIOSFullscreenManual.style.width = "100vw";
        divIOSFullscreenManual.style.height = "100vh";
        divIOSFullscreenManual.style.overflow = "hidden";
        divIOSFullscreenManual.style.zIndex = 10001;
        divIOSFullscreenManual.style.opacity = "1";
        divIOSFullscreenManual.addEventListener('click', onClickManualOverlay);

        var overlay = document.createElement("div");
        divIOSFullscreenManual.appendChild(overlay);
        overlay.style.position = "fixed";
        overlay.style.display = "block";
        overlay.style.flexDirection = "collumn";
        overlay.style.top = "0px";
        overlay.style.left = "0px";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.overflow = "hidden";
        overlay.style.zIndex = 10002;
        overlay.style.backgroundColor = "rgba(30, 30, 30, 0.5)";

        bgFullscreenPanel = document.createElement("div");
        divIOSFullscreenManual.appendChild(bgFullscreenPanel);
        bgFullscreenPanel.style.backgroundImage = "url('/images/rect_Panel.png')";
        bgFullscreenPanel.style.backgroundColor = "rgba(100, 100, 100, 0.9)";
        bgFullscreenPanel.style.borderRadius = "10px";
        bgFullscreenPanel.style.border = "1px solid #4a4a49";
        bgFullscreenPanel.style.padding = "0px";
        bgFullscreenPanel.style.position = "fixed";
        bgFullscreenPanel.style.display = "block";
        bgFullscreenPanel.style.zIndex = 10002;

        manualTitle = document.createElement("div");
        bgFullscreenPanel.appendChild(manualTitle);
        manualTitle.style.zIndex = 10003;
        manualTitle.style.position = "fixed";
        manualTitle.style.display = "block";
        manualTitle.style.borderRadius = "10px";
        manualTitle.style.margin = "auto";
        var str = getLocalizedDescContent("manualTitle");
        manualTitle.innerHTML = str ? str : "Trước khi bắt đầu";
        manualTitle.style.textAlign = "center";
        manualTitle.style.fontSize = "19px";
        manualTitle.style.color = "white";

        landscapeManualGif = new Image();
        var landscapeManualGifUrl = getLocalizedAssetUrl("landscapeManualGif");
        landscapeManualGif.src = landscapeManualGifUrl ? landscapeManualGifUrl : '/images/HideAddressBar_Hor_SRC.gif';
        divIOSFullscreenManual.appendChild(landscapeManualGif);
        landscapeManualGif.style.position = "fixed";
        landscapeManualGif.style.display = "block";
        landscapeManualGif.style.width = "300px";
        landscapeManualGif.style.height = "186px";
        landscapeManualGif.style.zIndex = 10003;

        landscapeManualFrame = new Image();
        landscapeManualFrame.src = '/images/Border_500x310.png';
        divIOSFullscreenManual.appendChild(landscapeManualFrame);
        landscapeManualFrame.style.position = "fixed";
        landscapeManualFrame.style.display = "block";
        landscapeManualFrame.style.width = "300px";
        landscapeManualFrame.style.height = "186px";
        landscapeManualFrame.style.zIndex = 10004;

        if (isPortraitGame()) {
            portraitManualDesc = document.createElement("div");
            bgFullscreenPanel.appendChild(portraitManualDesc);
            portraitManualDesc.style.zIndex = 10003;
            portraitManualDesc.style.position = "fixed";
            portraitManualDesc.style.display = "block";
            portraitManualDesc.style.width = "100%";
            portraitManualDesc.style.borderRadius = "10px";
            portraitManualDesc.style.margin = "auto";
            var str = getLocalizedDescContent("portraitManualDesc");
            portraitManualDesc.innerHTML = str ? str : "Thử ấn thanh công cụ Safari để có</br>trải nghiệm tốt hơn";
            portraitManualDesc.style.textAlign = "center";
            portraitManualDesc.style.fontSize = "16px";
            portraitManualDesc.style.color = "#7e807f";

            portraitManualGif = new Image();
            var portraitManualGifUrl = getLocalizedAssetUrl("portraitManualGif");
            portraitManualGif.src = portraitManualGifUrl ? portraitManualGifUrl : '/images/HideAddressBar_Ver_SRC.gif';
            divIOSFullscreenManual.appendChild(portraitManualGif);
            portraitManualGif.style.position = "fixed";
            portraitManualGif.style.display = "block";
            portraitManualGif.style.width = "216px";
            portraitManualGif.style.height = "408px";
            portraitManualGif.style.zIndex = 10003;

            portraitManualFrame = new Image();
            portraitManualFrame.src = '/images/Border_360x680.png';
            divIOSFullscreenManual.appendChild(portraitManualFrame);
            portraitManualFrame.style.position = "fixed";
            portraitManualFrame.style.display = "block";
            portraitManualFrame.style.width = "222px";
            portraitManualFrame.style.height = "414px";
            portraitManualFrame.style.zIndex = 10004;
        }

        bgFullscreenBlock = document.createElement("div");
        divIOSFullscreenManual.appendChild(bgFullscreenBlock);
        bgFullscreenBlock.style.position = "fixed";
        bgFullscreenBlock.style.display = "block";
        bgFullscreenBlock.style.zIndex = 10005;
        bgFullscreenBlock.addEventListener('click', onClickManualBG);

        sideBar = document.createElement("div");
        sideBar.style.backgroundImage = "url('/images/rect_Scoll.png')";
        sideBar.style.borderRadius = "3px";
        divIOSFullscreenManual.appendChild(sideBar);
        sideBar.style.zIndex = 10006;
        sideBar.style.position = "fixed";
        sideBar.style.display = "block";
        var sidebarBtn = document.createElement("div");
        sideBar.appendChild(sidebarBtn);
        sidebarBtn.style.width = "30px";
        sidebarBtn.style.height = "30px";
        sidebarBtn.style.zIndex = 10007;
        sidebarBtn.addEventListener('click', onClickCloseManualButton);

        closeManualBtn = new Image();
        closeManualBtn.src = '/images/Btn_Close.png';
        divIOSFullscreenManual.appendChild(closeManualBtn);
        closeManualBtn.style.position = "fixed";
        closeManualBtn.style.display = "block";
        closeManualBtn.style.width = "19px";
        closeManualBtn.style.height = "19px";
        closeManualBtn.style.zIndex = 10007;
        closeManualBtn.addEventListener('click', onClickCloseManualButton);
    }
}

function onClickCloseManualButton() {
    showIOSFullScreenManual(false);
}

function onClickManualOverlay() {
    if (!canClickOverlay) return;
    onClickCloseManualButton();
}

function onClickManualBG() {
    canClickOverlay = false;
    setTimeout(function () {
        canClickOverlay = true;
    }, 100);
}

function getDurationFromLastTime(lastTime) {
    var curDate = new Date();
    var curTime = curDate.getTime();
    var duration = Number(curTime) - Number(lastTime);
    return duration;
}

function setHiddenPopUpDayLimit(limit) {
    hiddenPopUpDayLimit = Number(limit);
}

function callManualOrientationEvent(delay = 1) {
    if (timeOutManualOrientationChange !== -1) {
        clearTimeout(timeOutManualOrientationChange);
    }
    timeOutManualOrientationChange = setTimeout(function () {
        var eventResize = new CustomEvent('orientationchange', { detail: { type: "manualCall" } });
        window.dispatchEvent(eventResize);
        timeOutManualOrientationChange = -1;
    }, delay);
}

function onOrientationChanged(event) {
    if (event.detail && event.detail.type == "manualCall") {
        return;
    }
    document.activeElement?.blur();
    if (isKeyboardShow) {
        var delay = isiPhone ? 500 : 150;
        setTimeout(function () {
            isKeyboardShow = false;
            callManualOrientationEvent();
        }, delay);
    } else {
        if (isiPhone) {
            if (window.orientation == 90 || window.orientation == -90) {
                listenChangeSize(false);
                alignGameCanvasWithScreen(100);
                if (isPortraitGame()) {
                    alignGameCanvasWithScreen(500);
                }
                if (isSafari && iOsVersion >= 17 && !isPortraitGame()) {
                    setTimeout(function () {
                        if (typeof mask !== 'undefined') {
                            if (maskEnableTimeOut !== -1) {
                                clearTimeout(maskEnableTimeOut);
                                maskEnableTimeOut = -1;
                            }
                            mask.style.display = 'none';
                            mask.style.opacity = 0;
                        }
                    }, 200);
                    setTimeout(function () {
                        onIOSFullscreenChanged(isFullScreenSafariIOS());
                    }, 500);
                }
            } else {
                listenChangeSize(true);
                alignGameCanvasWithScreen(400);
            }
            setTimeout(function () {
                window.scrollTo(0, 0);
                updateAdaptResult();
            }, 400);

        } else {
            alignGameCanvasWithScreen(500);
            listenChangeSize(true);
        }
        setTimeout(function () {
            updateSplashSize();
            updateSplashRotation();
            // saveInnerSize();
        }, 150);
    }
    updateManualAreaSize();
    console.log('onOrientationChanged window.innerHeight=', window.innerHeight, ' innerHeight width=', window.innerWidth);
}

function updateManualAreaSize() {
    var isLandscape = isLandscapeScreen();
    var heightOffset = isLandscape ? 0 : (window.innerHeight > 600 ? window.innerHeight / 6 : 40);
    if (isLandscape) {
        if (portraitManualDesc) {
            portraitManualDesc.style.display = "none";
        }
        if (portraitManualGif) {
            portraitManualGif.style.display = "none";
        }
        if (portraitManualFrame) {
            portraitManualFrame.style.display = "none";
        }

        if (landscapeManualGif) {
            landscapeManualGif.style.display = "block";
            landscapeManualGif.style.top = heightOffset + 54 + "px";
            landscapeManualGif.style.right = (window.innerWidth / 2 - 300) / 2 + "px";
        }
        if (landscapeManualFrame) {
            landscapeManualFrame.style.display = "block";
            landscapeManualFrame.style.top = heightOffset + 54 + "px";
            landscapeManualFrame.style.right = (window.innerWidth / 2 - 300) / 2 + "px";
        }
    } else {
        if (landscapeManualGif) {
            landscapeManualGif.style.display = "none";
        }
        if (landscapeManualFrame) {
            landscapeManualFrame.style.display = "none";
        }

        if (portraitManualDesc) {
            portraitManualDesc.style.display = "block";
            portraitManualDesc.style.top = heightOffset + 48 + "px";
        }

        if (portraitManualGif) {
            portraitManualGif.style.display = "block";
            portraitManualGif.style.top = heightOffset + 105 + "px";
            portraitManualGif.style.right = (window.innerWidth - 216) / 2 + "px";
        }
        if (portraitManualFrame) {
            portraitManualFrame.style.display = "block";
            portraitManualFrame.style.top = heightOffset + 102 + "px";
            portraitManualFrame.style.right = (window.innerWidth - 222) / 2 + "px";
        }
    }
    if (bgFullscreenPanel) {
        bgFullscreenPanel.style.width = isLandscape ? "55%" : (window.innerWidth - 2) + "px";
        bgFullscreenPanel.style.height = isLandscape ? (window.innerHeight - 2) + "px" : "100%";
        bgFullscreenPanel.style.top = heightOffset + "px";
        bgFullscreenPanel.style.left = isLandscape ? "50%" : "0%";
    }

    if (manualTitle) {
        manualTitle.style.width = isLandscape ? "50%" : "100%";
        manualTitle.style.top = heightOffset + 16 + "px";
    }

    if (bgFullscreenBlock) {
        bgFullscreenBlock.style.width = isLandscape ? "55%" : "100%";
        bgFullscreenBlock.style.height = "100%";
        bgFullscreenBlock.style.top = heightOffset + "px";
        bgFullscreenBlock.style.left = isLandscape ? "50%" : "0%";
    }
    if (sideBar) {
        if (isLandscape) {
            sideBar.style.width = "6px";
            sideBar.style.height = "28px";
            sideBar.style.top = (window.innerHeight / 2 - 14) + "px";
            sideBar.style.right = (window.innerWidth / 2 - 15) + "px";
        } else {
            sideBar.style.width = "28px";
            sideBar.style.height = "6px";
            sideBar.style.top = heightOffset + 8 + "px";
            sideBar.style.right = (window.innerWidth / 2 - 14) + "px";
        }
    }
    if (closeManualBtn) {
        closeManualBtn.style.top = heightOffset + 18 + "px";
        closeManualBtn.style.right = "18px";
    }
}

function onResized(event) {
    if (isMobile && event && parseInt(event.target.width) == window.innerWidth && parseInt(event.target.height) + 50 < window.innerHeight) {
        isKeyboardShow = true;
    } else {
        isKeyboardShow = false;
        // listenCallBack();
    }
    // if (!isKeyboardShow && isMobile) {
    //     setTimeout(function() {
    //         window.dispatchEvent(new Event('orientationchange'));
    //     }, 20);
    // }
}

function alignGameCanvasWithScreen(delayTime = 0) {
    if (timeOutAlignCanvas) {
        clearTimeout(timeOutAlignCanvas);
    }
    timeOutAlignCanvas = setTimeout(function () {
        var canvas = cc.game.canvas;
        var isLandscape = isLandscapeScreen();
        var _devicePxRatio = cc.screen.devicePixelRatio;
        var isNotSameOrientation = (isPortraitGame() && isLandscape) || (!isPortraitGame() && !isLandscape);
        if (isNotSameOrientation) {
            var canvasWidth = canvas.width / _devicePxRatio;
            if (canvasWidth > (isPortraitGame() ? window.innerWidth : window.innerHeight)) return;
        } else {
            var canvasHeight = canvas.height / _devicePxRatio;
            if (canvasHeight > window.innerHeight) return;
        }
        var _width = isNotSameOrientation ? window.innerHeight : window.innerWidth;
        var _height = isNotSameOrientation ? window.innerWidth : window.innerHeight;

        let policy = cc.view.getResolutionPolicy();
        if (policy) {
            policy.preApply(cc.view);
        } else {
            return;
        }
        cc.game.frame.style.width = _width + "px";
        cc.game.frame.style.height = _height + "px";
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        canvas.width = _width * _devicePxRatio;
        canvas.height = _height * _devicePxRatio;
        cc.view._viewportRect.width = _width * _devicePxRatio;
        cc.view._viewportRect.height = _height * _devicePxRatio;

        var result = policy.apply(cc.view, cc.view._designResolutionSize);

        if (result.scale && result.scale.length === 2) {
            cc.view._scaleX = result.scale[0];
            cc.view._scaleY = result.scale[1];
        }

        if (result.viewport) {
            var vp = cc.view._viewportRect,
                vb = cc.view._visibleRect,
                rv = result.viewport;

            vp.x = rv.x;
            vp.y = rv.y;
            vp.width = rv.width;
            vp.height = rv.height;

            vb.x = 0;
            vb.y = 0;
            vb.width = rv.width / cc.view._scaleX;
            vb.height = rv.height / cc.view._scaleY;
        }

        policy.postApply(cc.view);


        cc.screen.windowSize.width = cc.view._visibleRect.width;
        cc.screen.windowSize.height = cc.view._visibleRect.height;

        cc.visibleRect && cc.visibleRect.init(cc.view._visibleRect);


        //cc.renderer.updateCameraViewport();
        cc.view.emit('design-resolution-changed');
        var canvasNode = cc.find("Canvas");
        if (canvasNode) {
            var canvasComponent = canvasNode.getComponent(cc.Canvas);
            if (canvasComponent) {
                canvasComponent.alignCanvasWithScreen = true;
                cc._widgetManager.onResized();
            }
        } else {
            console.log("do not node: Canvas");
        }
        var eventFullScreenIOS = new Event('onFullScreenIOS');
        window.dispatchEvent(eventFullScreenIOS);
        // saveInnerSize();
        timeOutAlignCanvas = null;
    }, delayTime);
}

function setFullScreen(settings) { // eslint-disable-line
    var options;
    var canvasDesignResolutionSize = gameSettings ? gameSettings.screen.designResolution : cc.view.getDesignResolutionSize();
    if (canvasDesignResolutionSize) {
        isLandscapeCanvas = canvasDesignResolutionSize.width > canvasDesignResolutionSize.height;
    }
    divFullscreen = document.getElementById('div_full_screen');
    handImage = document.getElementById('handImage');
    enterFullscreenBtn = document.getElementById('enterFullscreen');
    exitFullscreenBtn = document.getElementById('exitFullscreen');
    if (isMobile && iOS) {
        document.ontouchend = onTouchEnded;
        if (isChrome) {
            window.onscroll = onScroll;
        }
    }
    var urlRuFS = new URL(window.location);
    var disableFullscreen = urlRuFS.searchParams.get('disableFullscreen');
    getCurrentLanguage(urlRuFS);
    iOsVersion = Number(cc.sys.osVersion.split("_")[0]) + Number(cc.sys.osVersion.split("_")[1]) * 0.1;

    if (isMobile && isAndroid && isLandscapeCanvas && !disableFullscreen) {
        if (typeof enterFullscreenBtn !== 'undefined') {
            enterFullscreenBtn.addEventListener("touchend", toggleFullscreen, false);
        }

        if (typeof exitFullscreenBtn !== 'undefined') {
            exitFullscreenBtn.addEventListener("touchend", toggleFullscreen, false);
        }

        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', onFullscreenChanged, false);
            document.addEventListener('mozfullscreenchange', onFullscreenChanged, false);
            document.addEventListener('fullscreenchange', onFullscreenChanged, false);
            document.addEventListener('MSFullscreenChange', onFullscreenChanged, false);

            document.addEventListener('fullscreenerror', onFullscreenError, false);
            document.addEventListener('mozfullscreenerror', onFullscreenError, false);
            document.addEventListener('webkitfullscreenerror', onFullscreenError, false);
            document.addEventListener('msfullscreenerror', onFullscreenError, false);

        }
        divFullscreen.style.visibility = "visible";
    } else {
        if (typeof divFullscreen !== 'undefined') {
            divFullscreen.style.visibility = "hidden";
        }
    }

    if (typeof handImage !== 'undefined') {
        handImage.style.display = 'none';
    }
    if (isMobile && iOS) {
        options = {
            swipeUpContent: '',
            // expandBodyHeightTo: '115vh',
            scrollWindowToTopOnShow: true,
            html5FullScreenContent: '',
        };
    } else if (isMobile && isAndroid)
        options = {
            swipeUpContent: '',
            customCSS: '.fixedFlexBox { position: absolute; top: 0;left: 0; right: 0; bottom: 0; width: 100%;height: 100%; background: rgba(20, 20, 20, 0.001)}',
            html5FullScreenContent: '',
        };
    if (!isPortraitGame() && typeof SwipeUp !== 'undefined' && iOsVersion < 15) {
        swipeUp = new SwipeUp(options);
    }

    listenCallBack();

    window.addEventListener('focus', function () {
        isKeyboardShow = false;
        isiPhone && checkViewIOS();
    });
    if (isiPhone) {
        window.addEventListener('gameShow', function () {
            var isLandscape = isLandscapeScreen();
            if (isFullScreenIOS && isLandscape || isPortraitGame()) {
                let frameSize = cc.screen.windowSize || cc.view.getFrameSize(); // cc.view._frameSize was removed in v34
                if (frameSize.width !== window.innerWidth || frameSize.height !== window.innerHeight) {
                    alignGameCanvasWithScreen(500);
                }
            }
        });
        checkViewIOS(); // !for case reload 
    }


    if (cc.sys.isBrowser) {
        setLoadingDisplay();
    }
}

function getCurrentLanguage(_urlRuFS) {
    var urlRuFS = _urlRuFS;
    if (!urlRuFS) urlRuFS = new URL(window.location);
    currentLanguage = urlRuFS.searchParams.get('l');
    currentLanguage = currentLanguage ? currentLanguage : 'vi';
    currentLanguage = currentLanguage.toLowerCase();
    return currentLanguage;
}

function getLocalizedAssetUrl(key) {
    if (!currentLanguage) getCurrentLanguage();
    if (LocalizedAssetUrl[key]) {
        return LocalizedAssetUrl[key][currentLanguage];
    }
    return null;
}

function getLocalizedDescContent(key) {
    if (!currentLanguage) getCurrentLanguage();
    if (LocalizedDescriptionContent[key]) {
        return LocalizedDescriptionContent[key][currentLanguage];
    }
    return null;
}

function saveToLocalStorage(key, value) {
    if (!localStorage) return null;
    localStorage.setItem(key, value);
    return value;
}

function loadFromLocalStorage(key) {
    if (!localStorage) return null;
    return localStorage.getItem(key);
}

function toggleFullscreen() {
    if (document.fullscreenElement || /* Standard syntax */
        document.webkitFullscreenElement || /* Chrome, Safari and Opera syntax */
        document.mozFullScreenElement ||/* Firefox syntax */
        document.msFullscreenElement) {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }

        if (typeof exitFullscreenBtn !== 'undefined') {
            exitFullscreenBtn.style.display = 'none';
        }

    } else {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm = document.body; //overwrite the element (for IE)
            docElm.msRequestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }

        if (typeof enterFullscreenBtn !== 'undefined') {
            enterFullscreenBtn.style.display = 'none';
        }
    }
}

function onFullscreenChanged() {
    if (isMobile && isAndroid) {
        if (document.fullscreenElement || /* Standard syntax */
            document.webkitFullscreenElement || /* Chrome, Safari and Opera syntax */
            document.mozFullScreenElement ||/* Firefox syntax */
            document.msFullscreenElement) {
            setTimeout(function () {
                if (typeof exitFullscreenBtn !== 'undefined') {
                    exitFullscreenBtn.style.display = 'block';
                }
                if (typeof enterFullscreenBtn !== 'undefined') {
                    enterFullscreenBtn.style.display = 'none';
                }
            }, 10);

        } else {
            setTimeout(function () {
                if (typeof enterFullscreenBtn !== 'undefined') {
                    enterFullscreenBtn.style.display = 'block';
                }
                if (typeof exitFullscreenBtn !== 'undefined') {
                    exitFullscreenBtn.style.display = 'none';
                }
            }, 10);
        }

        alignGameCanvasWithScreen(500);
        listenChangeSize(true);
    }
}

function onFullscreenError() {
    setTimeout(function () {
        if (typeof enterFullscreenBtn !== 'undefined') {
            enterFullscreenBtn.style.display = 'block';
        }
        if (typeof exitFullscreenBtn !== 'undefined') {
            exitFullscreenBtn.style.display = 'none';
        }
    }, 10);
}

function setLoadingDisplay() {
    // Loading splash scene
    // var progressBar = splash.querySelector('.progress-bar span');
    cc.loader.onProgress = function (completedCount, totalCount, item) {
        var percent = 100 * completedCount / totalCount;
        // if (progressBar) {
        //     progressBar.style.width = percent.toFixed(2) + '%';
        // }
    };
    splash.style.display = 'flex';
    splash.style.opacity = 1;

    if (typeof loadingIcon !== 'undefined' && loadingIcon != null && isPortraitGame()) {
        loadingIcon.style.display = 'block';
    }
    // progressBar.style.width = '0%';

    cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
        if (typeof loadingIcon !== 'undefined' && loadingIcon != null && isPortraitGame()) {
            loadingIcon.style.display = 'none';
        }
        loadOver = true;
        if (typeof gameCanvas !== undefined) {
            gameCanvas.style.opacity = 1;
            listenCallBack();
        }
    });
}

function getApiUrl(url) {
    var urlPart = url.split('/');
    return urlPart[0] + "//" + urlPart[2] + "/share/lib.js";
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

var urlRu = new URL(window.location);
var paramHref = urlRu.searchParams.get('ru');
if (paramHref && validURL(paramHref)) {
    var fullUrl = getApiUrl(paramHref);
    var depositLib = document.createElement('script');
    depositLib.type = "text/javascript";
    depositLib.src = fullUrl;
    document.body.appendChild(depositLib);
}

/**
 * @fix_portrait_iphone
 */
function checkViewIOS() {
    if (window.orientation == 90 || window.orientation == -90) { // landscape
        if (!timeOutAlignCanvas) {
            alignGameCanvasWithScreen(100);
        }
        listenChangeSize(false);
    } else {
        listenChangeSize(true);
    }
}

function listenChangeSize(isListen) {
    lastWindowHeight = window.innerHeight;
    if (isListen) {
        if (intervalCheckSize) {
            clearInterval(intervalCheckSize);
            intervalCheckSize = void 0;
        }
        intervalCheckSize = setInterval(checkSize, 500);
    } else {
        if (intervalCheckSize) {
            clearInterval(intervalCheckSize);
            intervalCheckSize = void 0;
        }
        document.body.style.top = "0px";
        updateAdaptResult();
    }
    if (isSafari && isMobile && !isPortraitGame()) {
        document.body.style.overflow = "auto";
    }
    // saveInnerSize();
}

function checkSize() {
    if (isKeyboardShow) return;

    if (isSafari) {
        window.scrollTo(0, 1);
    } else if (isChrome) {
        if (window.pageYOffset !== 0) {
            window.scrollBy(0, -1 * window.pageYOffset);
        }
    }

    var isMinimalUI = checkMinimalUI();

    if (isMinimalUI) {
        var diff = Math.abs(lastWindowHeight - window.innerHeight);
        lastWindowHeight = window.innerHeight;
        if (diff > 20) { // minimal-ui: resize but keep listener
            if (isChrome) {
                var offsetY = isIphoneX ? (window.innerHeight - document.documentElement.clientHeight) / 3
                    : (window.innerHeight - document.documentElement.clientHeight) / 4;
                document.body.style.top = offsetY + "px";
            }
            setTimeout(function () {
                updateAdaptResult();
            }, 500);
        }
    } else { // full-ui: resize and clear listener
        lastWindowHeight = window.innerHeight;
        // document.body.style.top = "0px";
        if (intervalCheckSize) {
            clearInterval(intervalCheckSize);
            intervalCheckSize = void 0;
        }
        setTimeout(function () {
            updateAdaptResult();
        }, 500);
    }
}

function updateAdaptResult() {
    cc.view._updateAdaptResult();
    // saveInnerSize();
}

function saveInnerSize() {
    // innerSize.width = window.innerWidth;
    // innerSize.height = window.innerHeight;
}

function checkMinimalUI() {
    var frameSize = cc.view.getFrameSize();
    var diffHeight = (window.innerHeight - frameSize.height);
    return diffHeight > 40;
}

var XORCipher = {
    encode: function (key, data) {
        data = xor_encrypt(key, data);
        return b64_encode(data);
    },
    decode: function (key, data) {
        data = b64_decode(data);
        return xor_decrypt(key, data);
    },
};

function stringToUtf8ByteArray(str) {
    var out = [], p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        } else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        } else if (
            ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
            ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        } else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
}

function utf8ByteArrayToString(bytes) { // array of bytes
    var out = [], pos = 0, c = 0;
    while (pos < bytes.length) {
        var c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        } else if (c1 > 191 && c1 < 224) {
            var c2 = bytes[pos++];
            out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
        } else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            var c2 = bytes[pos++]; // eslint-disable-line
            var c3 = bytes[pos++];
            var c4 = bytes[pos++];
            var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) -
                0x10000;
            out[c++] = String.fromCharCode(0xD800 + (u >> 10));
            out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
        } else {
            var c2 = bytes[pos++]; // eslint-disable-line
            var c3 = bytes[pos++]; // eslint-disable-line
            out[c++] =
                String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        }
    }
    return out.join('');
}

var b64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function b64_encode(data) {
    var o1, o2, o3, h1, h2, h3, h4, bits, r, i = 0, enc = "";
    if (!data) { return data; }
    do {
        o1 = data[i++];
        o2 = data[i++];
        o3 = data[i++];
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        enc += b64_table.charAt(h1) + b64_table.charAt(h2) + b64_table.charAt(h3) + b64_table.charAt(h4);
    } while (i < data.length);
    r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
}

function b64_decode(data) {
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, result = [];
    if (!data) { return data; }
    data += "";
    do {
        h1 = b64_table.indexOf(data.charAt(i++));
        h2 = b64_table.indexOf(data.charAt(i++));
        h3 = b64_table.indexOf(data.charAt(i++));
        h4 = b64_table.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        result.push(o1);
        if (h3 !== 64) {
            result.push(o2);
            if (h4 !== 64) {
                result.push(o3);
            }
        }
    } while (i < data.length);
    return result;
}

function xor_encrypt(key, data) {
    key = stringToUtf8ByteArray(key);
    return stringToUtf8ByteArray(data).map(function (c, i) {
        return c ^ Math.floor(i % key.length);
    });
}

function xor_decrypt(key, data) {
    key = stringToUtf8ByteArray(key);
    return utf8ByteArrayToString(data.map(function (c, i) {
        return c ^ Math.floor(i % key.length);
    }));
}

var configLinkEnc = '/config-enc-v2.json';
function methodGetData(url, callback, callbackErr) {
    var request = new XMLHttpRequest();
    var fullURL = url;
    request.open("GET", fullURL, true);
    request.timeout = 3000;
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            //get status text
            if (request.responseText) {
                callback(JSON.parse(request.responseText));
            } else {
                alert('');
            }
        } else if (request.readyState === 0) {
            callbackErr();
        }
        if (request.status !== 200) {
            callbackErr();
        }
    };
    request.ontimeout = function () {
        callbackErr();
    };
    request.onerror = () => {
        callbackErr();
    };
    request.send();
}

function encodeQueryData(data) {
    return Object.keys(data).map(function (key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
}

function methodPostData(url, data, callback, callbackErr) {
    var request = new XMLHttpRequest();
    var fullURL = url;
    request.open('POST', fullURL, true);
    request.timeout = 3000;
    var dataPost = encodeQueryData(data);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            //get status text
            if (request.responseText) {
                callback(JSON.parse(request.responseText));
            } else {
                alert('');
            }
        } else if (request.readyState === 0) {
            callbackErr();
        }
        if (request.status !== 200) {
            callbackErr();
        }
    };
    request.ontimeout = function () {
        callbackErr();
    };
    request.onerror = () => {
        callbackErr();
    };
    request.send(dataPost);
}

function handleBackGame() {
    alert('Xác thực tài khoản thất bại.');
    if (paramHref) {
        if (paramHref.trim() === 'close') {
            window.close();
        } else {
            window.location.href = paramHref;
        }
    } else {
        location.reload();
    }
}

var LocalizedAssetUrl = {
    "landscapeManualGif": {
        "vi": '/images/HideAddressBar_Hor_SRC.gif',
        "en": '/images/HideAddressBar_Hor_Eng.gif',
    },
    "portraitManualGif": {
        "vi": '/images/HideAddressBar_Ver_SRC.gif',
        "en": '/images/HideAddressBar_Ver_Eng.gif',
    },
};

var LocalizedDescriptionContent = {
    "warningUserLockScreen": {
        "vi": "Vui lòng khoá xoay màn hình hoặc sử dụng trình duyệt Safari để có trải nghiệm chơi game tốt nhất!",
        "en": "Please lock device orientation or open Safari browser for the best experience!",
    },
    "warningUserRotate": {
        "vi": "Vui lòng đổi về màn hình dọc</br>để tiếp tục chơi game!",
        "en": "Please switch back to portrait mode</br>to continue the game!",
    },
    "manualTitle": {
        "vi": "Trước khi bắt đầu",
        "en": "Before start",
    },
    "portraitManualDesc": {
        "vi": "Thử ấn thanh công cụ Safari để có</br>trải nghiệm tốt hơn",
        "en": "Press Safari Toolbar</br>for better experience",
    }
}
