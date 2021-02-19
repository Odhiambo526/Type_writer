const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait - parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get Full text of current word
    const fullTxt = this.words[current];

    // Check if deleting

    if(this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
// Add char
this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into Element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //  Initial Type speed
   let typeSpeed = 3;

   if(this.isDeleting) {
    typeSpeed /= 2;
   }


   // If word is complete
   if(!this.isDeleting && this.txt === fullTxt) {
       // Make a pause at end
       typeSpeed = this.wait;
       // Set deleting to true
       this.isDeleting = true;
   } else if(this.isDeleting && this.txt === '') {
       this.isDeleting = false;
       // Move to next word
       this.wordIndex++;
       // Pause before start typing
       typeSpeed = 500;

   }

    setTimeout(() => this.type(), 110)
}

// Init on DOM Load

document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
 const txtElement = document.querySelector('.txt-type');
 const words = JSON.parse(txtElement.getAttribute('data-words'));
 const wait = txtElement.getAttribute('data-wait');

 // Init TypeWriter
 new TypeWriter(txtElement, words, wait);
}