document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (navLinks && navLinks.classList.contains("active") && !event.target.closest("nav")) {
      navLinks.classList.remove("active")
    }
  })

  // Header scroll effect
  const header = document.querySelector("header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Animate elements when they come into view
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  animateElements.forEach((element) => {
    observer.observe(element);
  });


  // Testimonial Slider
  const testimonials = document.querySelector(".testimonial-slider")
  let currentSlide = 0

  if (testimonials) {
    const slides = testimonials.querySelectorAll(".testimonial")
    const totalSlides = slides.length
    const nextBtn = document.querySelector(".testimonial-next")
    const prevBtn = document.querySelector(".testimonial-prev")

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - index)}%)`
      })
    }

    // Initialize slider
    showSlide(currentSlide)

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides
        showSlide(currentSlide)
      })
    }

    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
        showSlide(currentSlide)
      })
    }

    // Auto slide
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides
      showSlide(currentSlide)
    }, 5000)
  }

  // Counter animation for stats
  const counters = document.querySelectorAll(".counter")

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target
            const target = parseInt(counter.getAttribute("data-target"))
            let count = 0
            const updateCounter = () => {
              const increment = target / 100
              if (count < target) {
                count += increment
                counter.innerText = Math.ceil(count)
                setTimeout(updateCounter, 10)
              } else {
                counter.innerText = target
              }
            }
            updateCounter()
            observer.unobserve(counter)
          }
        })
      },
      { threshold: 0.5 },
    )

    counters.forEach((counter) => {
      counterObserver.observe(counter)
    })
  }

  // Form validation
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      let isValid = true
      const requiredFields = form.querySelectorAll("[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")

          const errorMessage = field.nextElementSibling
          if (errorMessage && errorMessage.classList.contains("error-message")) {
            errorMessage.style.display = "block"
          } else {
            const message = document.createElement("span")
            message.classList.add("error-message")
            message.textContent = "This field is required"
            field.parentNode.insertBefore(message, field.nextSibling)
          }
        } else {
          field.classList.remove("error")
          const errorMessage = field.nextElementSibling
          if (errorMessage && errorMessage.classList.contains("error-message")) {
            errorMessage.style.display = "none"
          }
        }
      })

      if (!isValid) {
        event.preventDefault()
      } else {
        // For demo purposes, prevent actual form submission
        event.preventDefault()
        const successMessage = document.createElement("div")
        successMessage.classList.add("success-message")
        successMessage.textContent = "Form submitted successfully!"
        form.appendChild(successMessage)

        // Reset form after 3 seconds
        setTimeout(() => {
          form.reset()
          successMessage.remove()
        }, 3000)
      }
    })
  })
})

