export default {
    scrollNav: function() {
        var $layouts = document.getElementsByTagName('html');
        var $navbar = document.getElementsByClassName('navbar')[0];

        window.addEventListener('scroll', ()=>{
            if($layouts[0].scrollTop > 0){
                $navbar.classList.add('bigshadow')
            }else {
                $navbar.classList.remove('bigshadow')
            }
        })
    },
    initShow() {
        var $navbar = document.getElementsByClassName('navbar')[0];
        $navbar.classList.remove('bigshadow')

    },
    detailSet(){
        var $navbar = document.getElementsByClassName('navbar')[0];
        $navbar.classList.add('bigshadow')
    },
    gototop(){
        document.getElementsByClassName('layout')[0].scrollTop = 0
    }
}