let currentIndex = 0;
const images = document.querySelectorAll('.slider-img img');
const totalImages = images.length;

setInterval(() => {
currentIndex = (currentIndex + 1) % totalImages;
document.querySelector('.slider-img').style.transform = `translateX(-${currentIndex * 100}vw)`;
}, 5000); // chuyển ảnh mỗi 3 giây
