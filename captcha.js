document.addEventListener('DOMContentLoaded', () => {
    const captchaTypeSelect = document.getElementById('captcha-type');
    const arithmeticCaptchaContainer = document.getElementById('arithmetic-captcha-container');
    const imageCaptchaContainer = document.getElementById('image-captcha-container');

    const arithmeticChallengeSpan = document.getElementById('arithmetic-challenge');
    const arithmeticAnswerInput = document.getElementById('arithmetic-answer');
    const refreshArithmeticCaptchaButton = document.getElementById('refresh-arithmetic-captcha');
    const arithmeticError = document.getElementById('arithmetic-error');

    const imageChallengeText = document.getElementById('image-challenge-text');
    const imageOptionsContainer = document.getElementById('image-options');
    const imageError = document.getElementById('image-error');
    const refreshImageButton = document.getElementById('refresh-image-captcha');

    const captchaAttemptsError = document.getElementById('captcha-attempts-error');

    let currentCaptchaType = 'arithmetic';
    let arithmeticNum1, arithmeticNum2, arithmeticExpectedAnswer;
    let imageChallengeData;
    const captcha = (() => {
    let incorrectAttempts = 0;
    const maxIncorrectAttempts = 3;


    const imageCaptchaDataOptions = [
        {
            question: "Select all images containing cats",
            images: [
                { url: "https://placecats.com/80/80?id=1", isCorrect: true },
                { url: "https://placedog.net/80/80?id=1", isCorrect: false },
                { url: "https://placecats.com/80/80?id=2", isCorrect: true },
                { url: "https://placedog.net/80/80?id=2", isCorrect: false },
                { url: "https://placecats.com/80/80?id=3", isCorrect: true },
                { url: "https://loremflickr.com/80/80/bird?lock=1", isCorrect: false },
            ],
            correctIndices: [0, 2, 4],
        },
        {
            question: "Select all images Not containing Dogs",
            images: [
                { url: "https://loremflickr.com/80/80?random=3", isCorrect: true },
                { url: "https://placedog.net/80/80/4", isCorrect: false },
                { url: "https://loremflickr.com/80/80?random=2", isCorrect: true },
                { url: "https://placedog.net/80/80/5", isCorrect: false },
                { url: "https://loremflickr.com/80/80/tree?lock=3", isCorrect: true },
                { url: "https://placedog.net/80/80/4", isCorrect: false },
              
            ],
            correctIndices: [0, 2, 4],
        },
    ];

    function generateArithmeticCaptcha() {
        arithmeticNum1 = Math.floor(Math.random() * 10) + 1;
        arithmeticNum2 = Math.floor(Math.random() * 10) + 1;
        const operation = Math.random() < 0.5 ? '+' : '-';

        if (operation === '+') {
            arithmeticExpectedAnswer = arithmeticNum1 + arithmeticNum2;
            arithmeticChallengeSpan.textContent = `${arithmeticNum1} + ${arithmeticNum2} = ?`;
        } else {
            arithmeticExpectedAnswer = arithmeticNum1 - arithmeticNum2;
            arithmeticChallengeSpan.textContent = `${arithmeticNum1} - ${arithmeticNum2} = ?`;
        }
        arithmeticAnswerInput.value = '';
        arithmeticError.classList.add('hidden');
    }

    function generateImageCaptcha() {
        const randomIndex = Math.floor(Math.random() * imageCaptchaDataOptions.length);
        imageChallengeData = imageCaptchaDataOptions[randomIndex];
        imageChallengeText.textContent = imageChallengeData.question;
        imageOptionsContainer.innerHTML = '';

        imageChallengeData.images.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = `Captcha Image ${index + 1}`;
            img.classList.add('captcha-image-option');
            img.dataset.index = index;
            img.addEventListener('click', toggleImageSelection);
            imageOptionsContainer.appendChild(img);
        });
        imageError.classList.add('hidden');
    }

    function toggleImageSelection(event) {
        event.target.classList.toggle('selected');
    }

    function checkCurrentCaptcha() {
        if (currentCaptchaType === 'arithmetic') {
            const userAnswer = parseInt(arithmeticAnswerInput.value);
            if (!isNaN(userAnswer) && userAnswer === arithmeticExpectedAnswer) {
                return true;
            } else {
                arithmeticError.classList.remove('hidden');
                return false;
            }
        } else if (currentCaptchaType === 'image') {
            const selectedIndices = Array.from(imageOptionsContainer.querySelectorAll('.captcha-image-option.selected'))
                .map(img => parseInt(img.dataset.index))
                .sort((a, b) => a - b);
            const correctIndicesSorted = [...imageChallengeData.correctIndices].sort((a, b) => a - b);
            const result = JSON.stringify(selectedIndices) === JSON.stringify(correctIndicesSorted);
            if (!result) imageError.classList.remove('hidden');
            return result;
        }
    }

    function refreshCaptcha() {
        if (currentCaptchaType === 'arithmetic') {
            generateArithmeticCaptcha();
        } else if (currentCaptchaType === 'image') {
            imageOptionsContainer.querySelectorAll('.captcha-image-option.selected').forEach(img => {
                img.classList.remove('selected');
            });
            generateImageCaptcha();
        }
    }

    function validateCaptcha() {
        if (incorrectAttempts >= maxIncorrectAttempts) {
            captchaAttemptsError.classList.remove('hidden');
            return false;
        }

        const result = checkCurrentCaptcha();
        if (result) {
            resetAttempts();
            refreshCaptcha();
            captchaAttemptsError.classList.add('hidden');
            return true;
        } else {
            incorrectAttempts++;
            if (incorrectAttempts >= maxIncorrectAttempts) {
                captchaAttemptsError.classList.remove('hidden');
                arithmeticError.classList.add('hidden');
                imageError.classList.add('hidden');
            } else {
                refreshCaptcha();
            }
            return false;
        }
    }

    refreshArithmeticCaptchaButton.addEventListener('click', refreshCaptcha);
    refreshImageButton.addEventListener('click', refreshCaptcha);

    captchaTypeSelect.addEventListener('change', () => {
        currentCaptchaType = captchaTypeSelect.value;
        if (currentCaptchaType === 'arithmetic') {
            arithmeticCaptchaContainer.classList.remove('hidden');
            imageCaptchaContainer.classList.add('hidden');
        } else {
            arithmeticCaptchaContainer.classList.add('hidden');
            imageCaptchaContainer.classList.remove('hidden');
        }
        refreshCaptcha();
        arithmeticError.classList.add('hidden');
        imageError.classList.add('hidden');
        resetAttempts();
        captchaAttemptsError.classList.add('hidden');
    });

    // Initialize
    generateArithmeticCaptcha();
    generateImageCaptcha();

    // Expose captcha API
    window.captcha = {
        refreshCaptcha,
        validateCaptcha,
        getCurrentCaptchaType: () => currentCaptchaType,
        resetAttempts: () => incorrectAttempts = 0,
        getAttempts: () => incorrectAttempts,
        maxIncorrectAttempts
    };

    function resetAttempts() {
        incorrectAttempts = 0;
    }

    return {
        validateCaptcha,
        resetAttempts
    };
})();
});
