class Drawer {
  constructor(){
    this.overlay = document.getElementById('jsOverlay');
    this.hamburger = document.getElementById('jsHamburger');
    this.hamburgerLine = document.querySelectorAll('.l-header__hamburger-line');
    this.nav = document.getElementById('jsNav');
    this.header = document.getElementById('jsHeader');
    this.body = document.body;
    this.open = 'is-open';
    // drawer表示時のスクロールバーの差分
    this.diff = window.innerWidth - document.body.clientWidth;
    this.init();
  }
  init(){
    this.overlay.addEventListener('click', this, false);
    this.hamburger.addEventListener('click', this, false);
    this.nav.addEventListener('click', this, false);
  }
  toggle(){
    if(!this.hamburger.classList.contains(this.open)){
      this.nav.classList.add(this.open);
      this.overlay.classList.add(this.open);
      this.hamburger.classList.add(this.open);
      this.body.style.overflowY = 'hidden';
      for(let i = 0; i < this.hamburgerLine.length; i++){
        this.hamburgerLine[i].classList.add(this.open);
      }
      if(this.diff > 0){
        this.body.style.paddingRight = this.diff + 'px';
        this.header.style.marginRight = this.diff + 'px';
      }
    } else {
      this.nav.classList.remove(this.open);
      this.overlay.classList.remove(this.open);
      this.hamburger.classList.remove(this.open);
      this.body.style.overflowY = 'auto';
      for(let i = 0; i < this.hamburgerLine.length; i++){
        this.hamburgerLine[i].classList.remove(this.open);
      }
      this.body.style.paddingRight= '0px';
      this.header.style.marginRight = '0px';
    }
  }
  handleEvent(event){
    this.toggle(event);
  }
}

const drawer = new Drawer();