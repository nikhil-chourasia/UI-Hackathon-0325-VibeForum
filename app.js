// Sample data structure for posts and comments
let posts = [
    {
        id: 1,
        title: "Welcome to VibeForum!",
        content: "This is our first post. Feel free to start discussions!",
        category: "general",
        author: "Admin",
        timestamp: new Date(),
        votes: 15,
        comments: [
            {
                id: 1,
                content: "This is amazing! Looking forward to great discussions.",
                author: "User123",
                timestamp: new Date(),
                votes: 5,
                replies: [
                    {
                        id: 2,
                        content: "Me too! The UI looks great.",
                        author: "TechFan",
                        timestamp: new Date(),
                        votes: 3,
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Latest Tech Trends 2024",
        content: "Let's discuss the most exciting technology trends this year.",
        category: "tech",
        author: "TechEnthusiast",
        timestamp: new Date(),
        votes: 10,
        comments: []
    }
];

// DOM Elements
const postsList = document.getElementById('threadsList');
const categoryList = document.getElementById('categoryList');
const newPostBtn = document.getElementById('newThreadBtn');
const newPostModal = document.getElementById('newThreadModal');
const closeModal = document.querySelector('.close');
const newPostForm = document.getElementById('newThreadForm');
const sortSelect = document.getElementById('sortSelect');
const navBrand = document.querySelector('.nav-brand');

// Fun animations for the brand name
navBrand.addEventListener('mouseover', () => {
    navBrand.style.transform = 'scale(1.1)';
    navBrand.style.textShadow = '3px 3px 6px rgba(0,0,0,0.3)';
});

navBrand.addEventListener('mouseout', () => {
    navBrand.style.transform = 'scale(1)';
    navBrand.style.textShadow = '2px 2px 4px rgba(0,0,0,0.2)';
});

// Event Listeners
newPostBtn.addEventListener('click', () => {
    newPostModal.style.display = 'block';
    setTimeout(() => {
        newPostModal.classList.add('active');
    }, 10);
});

closeModal.addEventListener('click', () => {
    newPostModal.classList.remove('active');
    setTimeout(() => {
        newPostModal.style.display = 'none';
    }, 300);
});

window.addEventListener('click', (e) => {
    if (e.target === newPostModal) {
        newPostModal.classList.remove('active');
        setTimeout(() => {
            newPostModal.style.display = 'none';
        }, 300);
    }
});

// Category selection with animation
categoryList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        categoryList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
        e.target.classList.add('active');
        const category = e.target.dataset.category;
        
        e.target.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            e.target.style.animation = '';
        }, 500);
        
        displayPosts(category);
    }
});

// Sort posts with animation
sortSelect.addEventListener('change', () => {
    sortSelect.style.animation = 'pulse 0.5s';
    setTimeout(() => {
        sortSelect.style.animation = '';
    }, 500);
    
    const category = categoryList.querySelector('.active').dataset.category;
    displayPosts(category);
});

// Create confetti animation
function createConfetti() {
    const colors = ['#4a90e2', '#ff6b6b', '#4caf50', '#ffc107', '#9c27b0'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `confetti ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Create new post with animation
newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newPost = {
        id: posts.length + 1,
        title: document.getElementById('threadTitle').value,
        content: document.getElementById('threadContent').value,
        category: document.getElementById('threadCategory').value,
        author: "User",
        timestamp: new Date(),
        votes: 0,
        comments: []
    };
    
    posts.unshift(newPost);
    
    const postElement = createPostElement(newPost);
    postElement.style.animation = 'fadeIn 0.5s ease-out';
    postsList.insertBefore(postElement, postsList.firstChild);
    
    createConfetti();
    
    newPostModal.classList.remove('active');
    setTimeout(() => {
        newPostModal.style.display = 'none';
        newPostForm.reset();
    }, 300);
});

// Handle votes for posts and comments
function handleVote(type, id, increment, parentId = null) {
    let target;
    if (type === 'post') {
        target = posts.find(p => p.id === id);
    } else if (type === 'comment') {
        const post = posts.find(p => p.id === parentId);
        target = findComment(post.comments, id);
    }

    if (target) {
        target.votes += increment;
        
        const elementId = type === 'post' ? `post-${id}` : `comment-${id}`;
        const element = document.querySelector(`[data-${type}-id="${id}"]`);
        const voteCount = element.querySelector('.vote-count');
        const upvoteBtn = element.querySelector('.vote-btn.upvote');
        const downvoteBtn = element.querySelector('.vote-btn.downvote');
        
        voteCount.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            voteCount.style.animation = '';
        }, 500);
        
        voteCount.textContent = target.votes;
        
        if (increment > 0) {
            upvoteBtn.classList.add('upvoted');
            setTimeout(() => {
                upvoteBtn.classList.remove('upvoted');
            }, 1000);
        } else {
            downvoteBtn.classList.add('downvoted');
            setTimeout(() => {
                downvoteBtn.classList.remove('downvoted');
            }, 1000);
        }
    }
}

// Find a comment in the nested structure
function findComment(comments, id) {
    for (let comment of comments) {
        if (comment.id === id) return comment;
        if (comment.replies) {
            const found = findComment(comment.replies, id);
            if (found) return found;
        }
    }
    return null;
}

// Add a new comment or reply
function addComment(postId, content, parentCommentId = null) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newComment = {
        id: Date.now(),
        content: content,
        author: "User",
        timestamp: new Date(),
        votes: 0,
        replies: []
    };

    if (parentCommentId) {
        const parentComment = findComment(post.comments, parentCommentId);
        if (parentComment) {
            parentComment.replies.push(newComment);
        }
    } else {
        post.comments.push(newComment);
    }

    displayPosts(categoryList.querySelector('.active').dataset.category);
}

// Create post element with comment button
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post-card';
    postElement.setAttribute('data-post-id', post.id);
    
    postElement.innerHTML = `
        <div class="post-header">
            <h3 class="post-title">${post.title}</h3>
            <div class="post-meta">
                <span><i class="fas fa-user"></i> ${post.author}</span>
                <span><i class="fas fa-clock"></i> ${new Date(post.timestamp).toLocaleDateString()}</span>
                <span><i class="fas fa-folder"></i> ${post.category}</span>
            </div>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-footer">
            <div class="vote-buttons">
                <button class="vote-btn upvote" onclick="handleVote('post', ${post.id}, 1)">
                    <i class="fas fa-arrow-up"></i>
                </button>
                <span class="vote-count">${post.votes}</span>
                <button class="vote-btn downvote" onclick="handleVote('post', ${post.id}, -1)">
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
            <div class="post-stats">
                <span><i class="fas fa-comments"></i> ${post.comments ? post.comments.length : 0} comments</span>
            </div>
        </div>
        <button class="comment-btn" onclick="toggleComments(${post.id})">
            <i class="fas fa-comments"></i> Show Comments
        </button>
        <div class="comment-section" id="comments-${post.id}" style="display: none;">
            <div class="comment-form">
                <textarea placeholder="Write a comment..."></textarea>
                <button class="btn primary" onclick="submitComment(${post.id})">
                    <i class="fas fa-paper-plane"></i> Post Comment
                </button>
            </div>
            <div class="comments-list">
                ${post.comments ? post.comments.map(comment => createCommentElement(comment, post.id).outerHTML).join('') : ''}
            </div>
        </div>
    `;
    
    return postElement;
}

// Toggle comments visibility
function toggleComments(postId) {
    const commentSection = document.getElementById(`comments-${postId}`);
    const commentBtn = commentSection.previousElementSibling;
    
    if (commentSection.style.display === 'none') {
        commentSection.style.display = 'block';
        commentBtn.innerHTML = '<i class="fas fa-comments"></i> Hide Comments';
    } else {
        commentSection.style.display = 'none';
        commentBtn.innerHTML = '<i class="fas fa-comments"></i> Show Comments';
    }
}

// Submit new comment
function submitComment(postId) {
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    const content = post.querySelector('.comment-form textarea').value;
    
    if (content.trim()) {
        addComment(postId, content);
        post.querySelector('.comment-form textarea').value = '';
    }
}

// Create comment element with improved reply button
function createCommentElement(comment, postId, level = 0) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.setAttribute('data-comment-id', comment.id);
    commentElement.style.marginLeft = `${level * 20}px`;
    
    commentElement.innerHTML = `
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author"><i class="fas fa-user"></i> ${comment.author}</span>
                <span class="comment-time"><i class="fas fa-clock"></i> ${new Date(comment.timestamp).toLocaleDateString()}</span>
            </div>
            <p>${comment.content}</p>
            <div class="comment-footer">
                <div class="vote-buttons">
                    <button class="vote-btn upvote" onclick="handleVote('comment', ${comment.id}, 1, ${postId})">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <span class="vote-count">${comment.votes}</span>
                    <button class="vote-btn downvote" onclick="handleVote('comment', ${comment.id}, -1, ${postId})">
                        <i class="fas fa-arrow-down"></i>
                    </button>
                </div>
                <button class="reply-btn" onclick="toggleReplyForm(${postId}, ${comment.id})">
                    <i class="fas fa-reply"></i> Reply
                </button>
            </div>
            <div class="reply-form" id="reply-form-${comment.id}" style="display: none;">
                <textarea placeholder="Write your reply..."></textarea>
                <button class="btn primary" onclick="submitReply(${postId}, ${comment.id})">
                    <i class="fas fa-paper-plane"></i> Submit Reply
                </button>
            </div>
        </div>
        <div class="replies">
            ${comment.replies ? comment.replies.map(reply => createCommentElement(reply, postId, level + 1).outerHTML).join('') : ''}
        </div>
    `;
    
    return commentElement;
}

// Toggle reply form visibility
function toggleReplyForm(postId, commentId) {
    const replyForm = document.getElementById(`reply-form-${commentId}`);
    const replyBtn = replyForm.previousElementSibling.querySelector('.reply-btn');
    
    if (replyForm.style.display === 'none') {
        replyForm.style.display = 'block';
        replyBtn.innerHTML = '<i class="fas fa-times"></i> Cancel Reply';
    } else {
        replyForm.style.display = 'none';
        replyBtn.innerHTML = '<i class="fas fa-reply"></i> Reply';
    }
}

// Submit reply
function submitReply(postId, commentId) {
    const replyForm = document.getElementById(`reply-form-${commentId}`);
    const content = replyForm.querySelector('textarea').value;
    
    if (content.trim()) {
        addComment(postId, content, commentId);
        replyForm.style.display = 'none';
        replyForm.querySelector('textarea').value = '';
        
        // Reset reply button
        const replyBtn = replyForm.previousElementSibling.querySelector('.reply-btn');
        replyBtn.innerHTML = '<i class="fas fa-reply"></i> Reply';
    }
}

// Display posts with animation
function displayPosts(category) {
    let filteredPosts = category === 'all' 
        ? posts 
        : posts.filter(post => post.category === category);
    
    const sortBy = sortSelect.value;
    filteredPosts.sort((a, b) => {
        switch(sortBy) {
            case 'newest':
                return b.timestamp - a.timestamp;
            case 'popular':
                return b.votes - a.votes;
            case 'active':
                return b.comments.length - a.comments.length;
            default:
                return 0;
        }
    });
    
    postsList.innerHTML = '';
    
    filteredPosts.forEach((post, index) => {
        const postElement = createPostElement(post);
        postElement.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s`;
        postsList.appendChild(postElement);
    });
}

// Initial display with animation
setTimeout(() => {
    displayPosts('all');
}, 100);

// Add some fun Easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code Easter egg
    if (e.key === 'ArrowUp' && e.key === 'ArrowUp' && e.key === 'ArrowDown' && e.key === 'ArrowDown' && 
        e.key === 'ArrowLeft' && e.key === 'ArrowRight' && e.key === 'ArrowLeft' && e.key === 'ArrowRight' && 
        e.key === 'b' && e.key === 'a') {
        document.body.style.backgroundImage = 'linear-gradient(135deg, #ff6b6b 0%, #4a90e2 100%)';
        createConfetti();
    }
});

// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Load theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
});

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('morning-theme') ? 'dark' : 'light';
    applyTheme(newTheme);
});

function applyTheme(mode) {
    const body = document.body;

    if (mode === 'light') {
        body.classList.add('morning-theme');
        themeIcon.src = 'sun.svg';
    } else {
        body.classList.remove('morning-theme');
        themeIcon.src = 'moon.svg';
    }

    localStorage.setItem('theme', mode);
} 