## 8.12: Kirjailijan syntymävuosi advanced

For this exercise I used Bootstrap's "Select" solution. More information about it can be found:

https://getbootstrap.com/docs/5.0/forms/select/

1) Select option via Bootstrap:

```javascript

<select className='form-select form-select-sm' aria-label="Select which author to update!" onChange={handleAuthorChange}>
  <option value="default_value">Choose which author you want to update!</option>
  {authors.data.allAuthors.map(results =>
    <option value={results.name}>{results.name}</option>
  )}
</select>

```

2) Handle change for Author selection:

```javascript

const handleAuthorChange = (event) => {
  console.log(event.target.value)
  setName(event.target.value)
}

```
