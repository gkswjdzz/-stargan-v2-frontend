const fb = document.getElementsByClassName('to_facebook');
const tw = document.getElementsByClassName('to_twitter');
const cp = document.getElementsByClassName('copy_link');
const source = document.getElementById('source')

if (fb) {
  Array.from(fb).forEach(
    fb => fb.addEventListener("click", () => {
      window.open("https://www.facebook.com/sharer/sharer.php"
        +"?u="+encodeURIComponent(window.location.href)
      );
    })
  )
}

if (tw) {
  Array.from(tw).forEach(
    tw => tw.addEventListener("click", () => {
      window.open("https://twitter.com/intent/tweet"
        +"&text="+encodeURIComponent('Style Changer, StarGAN-v2')
        +"&url="+encodeURIComponent(window.location.href)
      );
    })
  )
}

if (cp) {
  Array.from(cp).forEach(
    cp => cp.addEventListener("click", copyToClipboard)
  )
}

if (source) {
  source.addEventListener('change', changeInputImage)
}

function changeInputImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (progressEvent) => {
    document.getElementById('your_image').src = progressEvent.target.result;
  };

  reader.readAsDataURL(file);
}

function copyToClipboard() {
  var t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = document.location.href;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
}

function uploadFile() {
  const input = document.getElementById('source');
  input.click();
}

document.getElementById("submit").onclick = () => {
  document.getElementById("submit").disabled = true;
  // document.getElementById("errorbox").innerHTML = "";
  const formData = new FormData();
  try{
    if (document.querySelector('input[name=face]:checked') == null){
      throw Error("Please Choose face type");
    }
    else if (document.getElementById('source').files[0] === undefined){
      throw Error("Please upload image file");
    }
  }catch (e) {
    // document.getElementById("errorbox").innerHTML = e;
    document.getElementById("submit").disabled = false;
    alert(e);
    return;
  }

  const check_model = document.querySelector('input[name=face]:checked').value
  const source = document.getElementById('source').files[0]

  formData.append('source', source)
  formData.append('check_model', check_model)

  fetch(
    'https://stargan-v2-psi1104.endpoint.ainize.ai//predict',
    {
      method: 'POST',
      body: formData,
    }
  )
  .then(async response => {
    if ( response.status == 200) {
      return response
    }
    else if( response.status == 413) {
      throw Error("This image file is larger than 1MB.")
    }
    else{
      throw Error((await response.clone().json()).message)
    }
  })
  .then(response => response.blob())
  .then(blob => URL.createObjectURL(blob))
  .then(imageURL => {
    document.getElementById("result_image").src = imageURL;
    // document.getElementById("errorbox").innerHTML = "";
    document.getElementById("submit").disabled = false;
  })
  .catch(e => {
    // document.getElementById("errorbox").innerHTML = e;
    document.getElementById("submit").disabled = false;
    alert(e)
  })
}