<template>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div v-if="title" class="modal-header">
                <h5  class="modal-title" id="exampleModalLabel">{{title}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{cancelbtn}}</button>
                <button type="button" class="btn btn-primary">{{confirmbtn}}</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: 'model',
        props : {
            title: {
                type: String,
                default: ''
            },
            cancelbtn: {
                type: String,
                default: '取消'
            },
            confirmbtn: {
                type: String,
                default: '确定'
            }
        }
    }
</script>