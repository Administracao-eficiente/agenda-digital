/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #0A1F44;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.container {
  background-color: #122A57;
  padding: 40px 25px;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  text-align: center;
}

/* ✅ Ajuste da logo com título */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}

.logo {
  width: 120px; 
  margin-bottom: 10px;
}

h1 {
  color: #4FC3F7;
}

h2 {
  margin-top: 40px;
  margin-bottom: 20px;
  color: #4FC3F7;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
}

input, textarea, select {
  padding: 12px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 1em;
}

button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #4FC3F7;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1em;
}

button:hover {
  background-color: #42b0df;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

li {
  background-color: #1B3A75;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
  text-align: left;
}

li strong {
  display: block;
  margin-bottom: 8px;
  font-size: 1.1em;
}

li p {
  margin-bottom: 8px;
}

/* ✅ Ajuste do espaçamento entre os botões */
li .button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

li button {
  flex: 1;
  min-width: 80px;
  text-align: center;
  padding: 7px 12px;
  border-radius: 5px;
  font-size: 0.9em;
}

#relatorio {
  margin-top: 40px;
  font-size: 1em;
}

select#filtro {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  margin-top: 20px;
  margin-bottom: 40px;
}

.filter-label {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 1em;
  color: #ccc;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

