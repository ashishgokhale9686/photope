var brightnessClick = false;

function brightnessHandler(){
    const brightnessInput = document.getElementById('brightness');
    brightnessClick = !brightnessClick;
    if(brightnessClick){
        brightnessInput.style.display = "block"
    }
    else{
        brightnessInput.style.display = "none"

    }
}

// steps for editing

document.addEventListener('DOMContentLoaded', ()=>{

    //step1: get all html elements using its id for reference

    const fileInput = document.getElementById('file');
    const download = document.getElementById('download');
    const canvas = document.getElementById('canvas');
    const brightnessInput = document.getElementById('brightness');
    const contrastInput = document.getElementById('contrast');
    const saturation = document.getElementById('saturation');
    const hue = document.getElementById('hue');
    const shadow = document.getElementById('shadow');
    const blur = document.getElementById('blur');
    const explore = document.getElementById('explore');
    const ctx = canvas.getContext('2d');



    let img;

    fileInput.addEventListener('change', getImage);

    brightnessInput.addEventListener('input', applyEffects);
    contrastInput.addEventListener('input', applyEffects);
    saturation.addEventListener('input', applyEffects);
    hue.addEventListener('input', applyEffects);
    download.addEventListener('click', downloadImage);

    //step3: for select the files
    function getImage(e){
        const file = e.target.files[0]; //[image0, image1, image...]
        const reader = new FileReader(); //reading selected file
        reader.onload = function (event){
            img = new Image(); //creating image tag
            img.onload = function (){
                canvas.width = img.width; // declaring image width for canvas
                canvas.height = img.height; //declaring image height for canvas
                ctx.drawImage(img, 0, 0);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file); //read the selected files dataURL
    }

    function applyEffects (){
        if(!img) return

        const brightnessValue = brightnessInput.value;
        const contrastValue = contrastInput.value;
        const saturationValue = saturation.value;
        var hueValue = hue.value;
        ctx.filter = brightness(`${brightnessValue}%) contrast(${contrastValue}%) saturate(${saturationValue}%)hue-rotate(${hueValue}deg`);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

   function downloadImage(){
    if(!img) return;
    var imagename = prompt("enter image name")

    const imageURL = canvas.toDataURL('image/png')

    const link = document.createElement('a');
    link.href= imageURL; //<a href="jhsghgshgs"></a>
    link.download = imagename + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

   }
})