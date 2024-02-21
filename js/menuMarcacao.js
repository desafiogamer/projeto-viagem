let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('header')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(Links => {
                Links.classList.remove('ativo');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('ativo');
            });
            document.querySelector('header').classList.add('ativo');
        }

        if(top <= offset && top <= offset + height){
            document.querySelector('header').classList.remove('ativo');
        }
    });
}


const btnAnimar = document.getElementById('btn-menu');
btnAnimar.addEventListener('click', animarMenu)
function animarMenu(){
    btnAnimar.classList.toggle('ativar')
}