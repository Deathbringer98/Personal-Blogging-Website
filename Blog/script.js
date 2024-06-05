document.addEventListener('DOMContentLoaded', (event) => {
    const postButton = document.getElementById('postButton');
    const postContent = document.getElementById('postContent');
    const posts = document.getElementById('posts');

    // Load posts from local storage
    loadPosts();

    postButton.addEventListener('click', () => {
        const content = postContent.value.trim();
        if (content !== "") {
            addPost(content);
            postContent.value = "";
        }
    });

    function addPost(content) {
        const post = document.createElement('div');
        post.classList.add('post');

        const postText = document.createElement('span');
        postText.textContent = content;
        post.appendChild(postText);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => {
            post.remove();
            savePosts();
        };
        post.appendChild(deleteButton);

        posts.appendChild(post);
        savePosts();
    }

    function savePosts() {
        const postContents = [];
        document.querySelectorAll('.post span').forEach(post => {
            postContents.push(post.textContent);
        });
        localStorage.setItem('posts', JSON.stringify(postContents));
    }

    function loadPosts() {
        const postContents = JSON.parse(localStorage.getItem('posts') || '[]');
        postContents.forEach(content => {
            addPost(content);
        });
    }
});
