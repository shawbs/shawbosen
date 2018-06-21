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
        // position: relative;
        transform-style: preserve-3d;
        animation: rotateanimation 20s linear 3s infinite forwards; 
        transform: rotateX(-30deg) rotateY(-207deg) rotateZ(0deg);
    }
    .logo-box .square{
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 4px;
    }
    .logo-box .t{
        background: rgba(0,0,0,.5);
        transform: rotateX(90deg) translateZ($width/2);
    }
    .logo-box .b{
        background: rgba(0,255,0,.2);
        transform: rotateX(270deg) translateZ($width/2);
    }
    .logo-box .l{
        background: rgba(20,0,100,.3);
        transform: rotateY(270deg) translateZ($width/2);
    }
    .logo-box .r{
        background: rgba(204, 102, 153,.5);
        transform: rotateY(90deg) translateZ($width/2);
    }
    .logo-box .z1{
        background: rgba(255,0,0,.3);
        transform: rotateZ(270deg) translateZ(-($width/2));
    }
    .logo-box .z2{
        background: rgba(0,20,20,.6);
        transform: rotateZ(90deg) translateZ($width/2);
    }

     @keyframes rotateanimation{
        0%{
            transform:  rotateX(-30deg) rotateY(-207deg) rotateZ(0deg);
        }
        20%{
            transform:  rotateX(-30deg) rotateY(-207deg) rotateZ(180deg);
        }
        40%{
            transform:  rotateX(-30deg) rotateY(0deg) rotateZ(180deg);
        }
        
        60%{
            transform:  rotateX(-130deg) rotateY(0deg) rotateZ(180deg);
        }
        80%{
            transform:  rotateX(-130deg) rotateY(-207deg) rotateZ(180deg);
        }
        100%{
            transform:  rotateX(-30deg) rotateY(-207deg) rotateZ(0deg);
        }
    }

    .top-logo{
        position: absolute;
        top: 0;
        left: 20px;
    }

</style>