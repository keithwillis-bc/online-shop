const imagePicker = document.querySelector("#image-upload-control input");
const imagePreview = document.querySelector("#image-upload-control img");

function updateImagePreview(){
    const files = imagePicker.files;

    if(!files || files.length === 0){
        imagePreview.getElementsByClassName.display = 'none';
        return;
    }

    const pickedFile = files[0];
    console.log(pickedFile);

    imagePreview.src = URL.createObjectURL(pickedFile);
    imagePreview.style.display = 'block';
    console.log (imagePreview);
}

imagePicker.addEventListener("change", updateImagePreview);
