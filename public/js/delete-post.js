const deletePostHandler = async (event) => {
    event.preventDefault();

    const blogID = document.getElementById('blog-id').textContent;

    const response = await fetch(`/api/dashboard/${blogID}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete blog');
    }
};

document
    .querySelector('#delete-post')
    .addEventListener('click', deletePostHandler);