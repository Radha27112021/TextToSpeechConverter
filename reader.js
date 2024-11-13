const main=document.querySelector('main');
const voiceSelected=document.getElementById('voices');
const textArea=document.getElementById('text');
const readBtn=document.getElementById('read');
const toggleBtn=document.getElementById('toggle');
const closeBtn=document.getElementById('close');
const data=[{
    src:'./images/angry1.jpg',
    text:'I am angry'
},{
    src:'./images/hungry.jpg',
    text:'I am hungry'
},
{
    src:'./images/sleep.avif',
    text:'I feel sleepy'
},
{
    src:'./images/tired.avif',
    text:'I am tired'
},
{
    src:'./images/alone.jpg',
    text:'I am alone'
},{
    src:'./images/grandma.jpg',
    text:'I want to meet my grandmother'
},{
    src:'./images/happy.avif',
    text:'I am happy'
},{
    src:'./images/home.jpg',
    text:'I will go home'
},{
    src:'./images/hurt.avif',
text:'I am hurt'
},{
    src:'./images/outside.jpg',
    text:'I am outside'
},{
    src:'./images/sad.jpg',
    text:'I am sad'
},{
    src:'./images/school.jpg',
    text:'I will go school'
}
];
data.forEach(createBox);
// Create speech box
function createBox(item){
const box=document.createElement('div');
const {src,text}=item;
box.classList.add('box');
box.innerHTML=`
<img src="${src}" alt="${text}">
<p class="info">${text}</p>`;
box.addEventListener('click',()=>{
    setTextMessage(text);
    speakText();
    // Add active effect
    box.classList.add('active');
    setTimeout(()=> box.classList.remove('active'),800);
});
main.appendChild(box);
}
//Init speech synthesis
const message=new SpeechSynthesisUtterance();
// Store voices
let voices=[];
function getVoices(){
    voices=speechSynthesis.getVoices();
    voices.forEach(voice=>{
        const option=document.createElement('option');
        option.value=voice.name;
        option.innerText=`${voice.name}${voice.lang}`;
        voiceSelected.appendChild(option);
    });
}
// Set text message
function setTextMessage(text){
    message.text=text;
}
// speak text message
function speakText(){
    speechSynthesis.speak(message);
}
// set voice
function setVoice(e){
    message.voice=voices.find(voice=>voice.name===e.target.value);
}
// Voices changed
    speechSynthesis.addEventListener('voiceschanged',getVoices);
// toggle text box
toggleBtn.addEventListener('click',()=>
document.getElementById('text-box').classList.toggle('show'));
// close text box
closeBtn.addEventListener('click',()=>
document.getElementById('text-box').classList.remove('show'));
// change voice 
voiceSelected.addEventListener('change',setVoice);
// read text button
readBtn.addEventListener('click',()=>{
    setTextMessage(textArea.value);
    speakText();
});
getVoices();