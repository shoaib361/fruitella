const stars = document.querySelectorAll('.stars button');
const rating = document.querySelector('#rating');
const form = document.querySelector('#feedbackForm');
const message = document.querySelector('.form-message');

function paintStars(value) {
  stars.forEach((star) => star.classList.toggle('active', Number(star.dataset.value) <= value));
}

stars.forEach((star) => {
  star.addEventListener('click', () => {
    rating.value = star.dataset.value;
    paintStars(Number(rating.value));
  });
  star.addEventListener('mouseenter', () => paintStars(Number(star.dataset.value)));
});
document.querySelector('.stars').addEventListener('mouseleave', () => paintStars(Number(rating.value)));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (Number(rating.value) === 0) {
    message.textContent = 'Please select a star rating first.';
    message.style.color = '#b24a2d';
    return;
  }
  const feedback = { name: document.querySelector('#name').value, rating: rating.value, message: document.querySelector('#message').value, date: new Date().toISOString() };
  const saved = JSON.parse(localStorage.getItem('fruitellaFeedback') || '[]');
  saved.push(feedback);
  localStorage.setItem('fruitellaFeedback', JSON.stringify(saved));
  form.reset(); rating.value = 0; paintStars(0);
  message.textContent = 'Shukriya! Your feedback has been saved.';
  message.style.color = '#2f7651';
});
document.querySelector('#year').textContent = new Date().getFullYear();
