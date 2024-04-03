const editPostBtn = document.getElementById('edit-post');
const saveChangesBtn = document.getElementById('savechanges');

const editPostHandler = async (event) => {
    event.preventDefault();

    const blogID = document.getElementById('blog-id').textContent;

    document.location.replace(`/dashboard/edit/${blogID}`);
};

const saveChangesHandler = async (event) => {
    event.preventDefault();

    const blogID = document.getElementById('blog-id').textContent;
    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-description').value;

    const response = await fetch(`/api/dashboard/${blogID}`, {
        method: 'PUT',
        body: JSON.stringify({title, description}),
        headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update blog');
    }
};

if (editPostBtn){
    editPostBtn.addEventListener('click', editPostHandler);
}

if (saveChangesBtn){
    saveChangesBtn.addEventListener('click', saveChangesHandler);
}
