<template>
    <div class="logo-box link" @click="$router.push('/')">
        <div class="square t"></div>
        <div class="square b"></div>
        <div class="square l"></div>
        <div class="square r"></div>
        <div class="square z1"></div>
        <div class="square z2"></div>
    </div>
</template>


<style lang="scss">
    $width: 30px;
    $height: 30px;
    .logo-box{
        display: block;
        width: $width;
        height: $height;
        position: relative;
        transform-style: preserve-3d;
        animation: rotateanimation 5s linear 3s infinite; 
        transform: rotateX(-30deg) rotateY(-207deg) rotateZ(0deg);
    }
    .logo-box .square{
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 4px;
    }
    .logo-box .t{
        background: #A2CD5A;
        transform: rotateX(90deg) translateZ($width/2);
    }
    .logo-box .b{
        background: #CD8500;
        transform: rotateX(270deg) translateZ($width/2);
    }
    .logo-box .l{
        background: #B0E2FF;
        transform: rotateY(270deg) translateZ($width/2);
    }
    .logo-box .r{
        background: #BCD2EE;
        transform: rotateY(90deg) translateZ($width/2);
    }
    .logo-box .z1{
        background: #8B7500;
        transform: rotateZ(270deg) translateZ(-($width/2));
    }
    .logo-box .z2{
        background: #858585;
        transform: rotateZ(90deg) translateZ($width/2);
    }

     @keyframes rotateanimation{
        0%{
            transform:  rotateX(-30deg) rotateY(-207deg) rotateZ(0deg);
        }
        80%{
            transform:  rotateX(-30deg) rotateY(-207deg) rotateZ(-360deg);
        }
        100%{
            transform:  rotateX(-30deg) rotateY(-207deg) rotateZ(-360deg);
        }
    }

</style>