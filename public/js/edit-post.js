const editPostHandler = async (event) => {
    event.preventDefault();

    const blogID = document.getElementById('blog-id').textContent;
    console.log(blogID);

    document.location.replace(`/dashboard/edit/${blogID}`);
};

document
    .querySelector('#edit-post')
    .addEventListener('click', editPostHandler);
