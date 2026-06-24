<script>
// JavaScript code to toggle project details visibility
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const details = this.querySelector('.project-details');
            details.style.display = 'block';
        });

        card.addEventListener('mouseleave', function () {
            const details = this.querySelector('.project-details');
            details.style.display = 'none';
        });
    });
});
</script>