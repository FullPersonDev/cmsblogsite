const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const description = document.querySelector('#post-description').value;
    console.log('title:', title);
    console.log('description:', description);

    if (title && description) {
        const response = await fetch('/api/dashboard', {
            method: 'POST',
            body: JSON.stringify({title, description}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create blog');
        }
    }
};

document
    .querySelector('#create-post')
    .addEventListener('click', createPostHandler);