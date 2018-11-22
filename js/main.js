'use strict';

//render pics to page
const hornsGallery = [];
const keywords = [];
const keywordsFinal = [0];

function horns(obj) {
    this.title = obj.title;
    this.image_url = obj.image_url;
    this.description = obj.description;
    this.keyowrd = obj.keyword;

    hornsGallery.push(this);
    keywords.push(obj.keyword)
}

    horns.prototype.render = function() {

    $('main').append('<div class="clone"></div>');
    let $clone = $('div[class="clone"]');
    let hornsTemplate = $('#photo-template').html();
    $clone.html(hornsTemplate);
    $clone.find('h2').text(this.title);
    $clone.find('p').text(this.description);
    $clone.find('img').attr('src', this.image_url);
    $clone.removeClass('clone');
    $clone.attr('class', this.title);  
  
  }


  function readJson () {

    $.get('data/page-1.json', 'json')
  
      .then(data => {
      data.forEach(hornsObj => {
        new horns(hornsObj);
        })
    })
  
      .then(function() {
      hornsGallery.forEach(horns =>{
      horns.render();
  
      hornsGallery.forEach(horns => {
        console.log()
      })
        })
  
      })
  }
   
  $(() => readJson());

  const popFilter = function() {
    keywords.forEach(element => {
      console.log(element);
      var doIt = true;
      for(let i in keywordsFinal) {
        if(element === keywordsFinal[i]) {
          doIt = false;
          break;
        }

      }
      if(doIt === true) {
        keywordsFinal.push(element);
      }
      }) 
      
  }

  popFilter();

//   $.get('data/page-1.json', 'json')
//   .then(data => {}
//   var $dropdown = $("#dropdown");
//   $.each(result, function() {
//   $dropdown.append($("<option />").text(this.title));
// });
  


//add button to hide all pics but ones with selected data types