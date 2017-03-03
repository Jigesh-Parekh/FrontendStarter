(function (){
    function myCounter($document) {

    }

    angular
        .module('blocJams')
        .directive('myCounter', ['$document', myCounter]);
})