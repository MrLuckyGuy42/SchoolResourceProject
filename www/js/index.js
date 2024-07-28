/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message-error");
    messageElement.classList.add('form__message--${type}');
}


document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#Login")

    loginForm.addEventListener("submit", e => {
        e.preventDefault();


        setFormMessage(loginForm, "error", "Invalid username/passowrd combination");
    });

})

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginButton").onclick = function() {
        window.location.href = "Login.html";
    };
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorElement = document.getElementById('login-error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('js/server.js', { // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Handle successful login (e.g., redirect or display a success message)
                window.location.href = '/dashboard'; // Redirect to a dashboard or home page
            } else {
                // Handle errors (e.g., display an error message)
                const error = await response.text();
                errorElement.textContent = error;
                errorElement.style.display = 'block';
            }
        } catch (error) {
            // Handle network errors
            errorElement.textContent = 'Network error occurred.';
            errorElement.style.display = 'block';
        }
    });
});
