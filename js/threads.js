document.addEventListener('DOMContentLoaded', function() {
    const newThreadBtn = document.getElementById('newThreadBtn');
    const threadModal = document.getElementById('threadModal');
    const closeModal = document.querySelector('.close-modal');
    const threadForm = document.getElementById('threadForm');
    const threadList = document.getElementById('threadList');
    const imageUpload = document.getElementById('threadImage');
    const imagePreview = document.querySelector('.image-preview');

    // Handle image upload and preview
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.style.display = 'block';
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            }
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
            imagePreview.innerHTML = '';
        }
    });

    // Create new thread
    threadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('threadTitle').value;
        const content = document.getElementById('threadContent').value;
        const category = document.getElementById('threadCategory').value;
        const imageFile = imageUpload.files[0];
        
        let imageUrl = '';
        if (imageFile) {
            // In a real application, you would upload the image to a server
            // For demo purposes, we'll use a placeholder image
            imageUrl = 'https://picsum.photos/800/400';
        }

        const thread = {
            id: Date.now(),
            title: title,
            content: content,
            category: category,
            author: 'Demo User',
            date: new Date().toLocaleDateString(),
            likes: 0,
            comments: [],
            image: imageUrl
        };

        addThread(thread);
        threadModal.style.display = 'none';
        threadForm.reset();
        imagePreview.style.display = 'none';
        imagePreview.innerHTML = '';
    });

    function addThread(thread) {
        const threadElement = document.createElement('div');
        threadElement.className = 'thread';
        threadElement.innerHTML = `
            <div class="thread-header">
                <h3>${thread.title}</h3>
                <span class="category">${thread.category}</span>
            </div>
            ${thread.image ? `
                <div class="thread-image-container">
                    <img class="thread-image" src="${thread.image}" alt="Thread image">
                </div>
            ` : ''}
            <div class="thread-content">${thread.content}</div>
            <div class="thread-footer">
                <div class="thread-meta">
                    <span class="author">Posted by ${thread.author}</span>
                    <span class="date">${thread.date}</span>
                </div>
                <div class="thread-actions">
                    <button class="btn like-btn" onclick="likeThread(${thread.id})">
                        <i class="fas fa-heart"></i> ${thread.likes}
                    </button>
                    <button class="btn comment-btn" onclick="toggleComments(${thread.id})">
                        <i class="fas fa-comment"></i> ${thread.comments.length}
                    </button>
                </div>
            </div>
            <div class="comments-section" id="comments-${thread.id}"></div>
        `;
        
        threadList.insertBefore(threadElement, threadList.firstChild);
    }

    // Add demo thread with image
    const demoThread = {
        id: 1,
        title: 'Welcome to VibeForum!',
        content: 'This is a demo thread showcasing the image upload feature. Feel free to create your own threads with images!',
        category: 'General',
        author: 'Admin',
        date: new Date().toLocaleDateString(),
        likes: 42,
        comments: [
            { author: 'User1', content: 'Great feature!', date: '2024-03-20' },
            { author: 'User2', content: 'Love the design!', date: '2024-03-20' }
        ],
        image: 'https://picsum.photos/800/400'
    };
    addThread(demoThread);
}); 