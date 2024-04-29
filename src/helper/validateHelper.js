export const m3uFormValidate = (formData, setErrors) => {
  const errors = {};
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email address";
  }
  if (!formData.link) {
    errors.link = "M3U URL is required";
  } else if (!/^https?:\/\//i.test(formData.link)) {
    errors.link = "URL must start with 'http://' or 'https://'";
  }
  setErrors(errors);
  return Object.keys(errors).length === 0;
};
