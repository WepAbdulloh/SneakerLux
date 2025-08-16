        let cart = JSON.parse(localStorage.getItem('sneakerCart')) || [];
        let currentPage = 'home';

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            updateCartCount();
            updateCartDisplay();
        });

        // Page navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Find and activate current nav link
            const currentNavLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
            if (currentNavLink && currentNavLink.classList.contains('nav-link')) {
                currentNavLink.classList.add('active');
            }
            
            currentPage = pageId;
            
            // Update cart display if on cart page
            if (pageId === 'cart') {
                updateCartDisplay();
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        }

        // Cart functions
        function addToCart(name, brand, price, emoji) {
            const item = {
                id: Date.now(),
                name: name,
                brand: brand,
                price: price,
                emoji: emoji
            };
            
            cart.push(item);
            localStorage.setItem('sneakerCart', JSON.stringify(cart));
            updateCartCount();
            showNotification(`${name} savatga qo'shildi!`);
        }

        function removeFromCart(itemId) {
            cart = cart.filter(item => item.id !== itemId);
            localStorage.setItem('sneakerCart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
            showNotification('Mahsulot savatdan olib tashlandi');
        }

        function updateCartCount() {
            document.getElementById('cartCount').textContent = cart.length;
        }

        function updateCartDisplay() {
            const cartItems = document.getElementById('cartItems');
            const cartContent = document.getElementById('cartContent');
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; opacity: 0.7; font-size: 1.2rem;">Savatcha bo\'sh</p>';
                return;
            }
            
            let total = 0;
            let itemsHTML = '';
            
            cart.forEach(item => {
                total += item.price;
                itemsHTML += `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h3>${item.emoji} ${item.name}</h3>
                            <p>${item.brand}</p>
                        </div>
                        <div>
                            <div class="cart-item-price">${item.price.toLocaleString()} so'm</div>
                            <button class="remove-btn" onclick="removeFromCart(${item.id})">O'chirish</button>
                        </div>
                    </div>
                `;
            });
            
            cartItems.innerHTML = itemsHTML;
            
            // Add total and checkout
            const totalHTML = `
                <div class="cart-total">
                    <div class="total-amount">Jami: ${total.toLocaleString()} so'm</div>
                    <button class="checkout-btn" onclick="checkout()">Buyurtma berish</button>
                </div>
            `;
            
            cartItems.innerHTML += totalHTML;
        }

        function checkout() {
            if (cart.length === 0) {
                showNotification('Savatcha bo\'sh!');
                return;
            }
            
            showNotification('Buyurtma qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
            cart = [];
            localStorage.setItem('sneakerCart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
        }

        // Contact form
        function submitContactForm(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const name = formData.get('name');
            
            showNotification(`Rahmat ${name}! Xabaringiz qabul qilindi. Tez orada javob beramiz.`);
            event.target.reset();
        }

        // Notification system
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        // Smooth scrolling for anchor links
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'96ef767590d61e3a',t:'MTc1NTE2NDEzMi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();