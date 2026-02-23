<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const submitted = ref(false)
const error = ref('')

async function onSubmit() {
  if (!email.value || !email.value.includes('@')) {
    error.value = 'Please enter a valid email address.'
    return
  }
  error.value = ''

  // TODO: Replace this URL with your actual Brevo form action URL
  // You can get this from Brevo > Contacts > Forms > Create a form > Get embed code
  // The form action URL looks like: https://sibforms.com/serve/XXXXX
  const BREVO_FORM_URL = 'https://ae8222f3.sibforms.com/serve/MUIFAFVY1lcYq6Ipu5dAdXteqrexW4eWvzXBELaatjLWr8WqDHWHORZHW5XDx0qpPVBrZI6bzBLXinoYFNcqeepNwPRC3VJRuIKN6gNttci8L9blWS2vyErONtsqnJQoIabwOGd9ar34AEMUDNzApZ9c-WY6O3trOTKqt3KTWN7sXaeid9srGyC_bIa6JcPuYOIn92EMN0v9zmPRMg=='

  if (!BREVO_FORM_URL) {
    // Placeholder behaviour until Brevo is configured
    submitted.value = true
    return
  }

  try {
    await fetch(BREVO_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ EMAIL: email.value }).toString(),
      mode: 'no-cors',
    })
    submitted.value = true
  } catch {
    error.value = 'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <section class="signup">
    <div class="signup__inner">
      <h2 class="signup__title">Stay updated</h2>
      <p class="signup__subtitle">
        Get notified about new features and premium templates.
      </p>

      <div v-if="submitted" class="signup__success">
        Thanks! You're on the list.
      </div>

      <form v-else class="signup__form" @submit.prevent="onSubmit">
        <input
          v-model="email"
          type="email"
          class="signup__input"
          placeholder="you@example.com"
          autocomplete="email"
          required
        />
        <button type="submit" class="signup__button">Subscribe</button>
      </form>

      <p v-if="error" class="signup__error">{{ error }}</p>
      <p class="signup__note">No spam. Unsubscribe anytime.</p>
    </div>
  </section>
</template>

<style scoped>
.signup {
  padding: 64px 0;
  margin-top: 16px;
}

.signup__inner {
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 32px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
}

.signup__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}

.signup__subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0 0 24px;
}

.signup__form {
  display: flex;
  gap: 8px;
}

.signup__input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  font-size: 15px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.15s;
}

.signup__input:focus {
  border-color: var(--vp-c-brand-1);
}

.signup__input::placeholder {
  color: var(--vp-c-text-3);
}

.signup__button {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  background: var(--vp-c-brand-1);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  box-shadow: 0 0 16px rgba(0, 178, 173, 0.25);
}

.dark .signup__button {
  color: #0a0a0a;
}

.signup__button:hover {
  box-shadow: 0 0 24px rgba(0, 178, 173, 0.4);
  transform: translateY(-1px);
}

.signup__success {
  padding: 14px 20px;
  background: rgba(0, 178, 173, 0.1);
  border: 1px solid rgba(0, 178, 173, 0.2);
  border-radius: 10px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.signup__error {
  font-size: 13px;
  color: #dc2626;
  margin: 8px 0 0;
}

.dark .signup__error {
  color: #f87171;
}

.signup__note {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 12px 0 0;
}

@media (max-width: 640px) {
  .signup {
    padding: 48px 0;
  }

  .signup__title {
    font-size: 24px;
  }

  .signup__form {
    flex-direction: column;
  }

  .signup__button {
    width: 100%;
  }
}
</style>
