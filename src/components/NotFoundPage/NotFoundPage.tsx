
function NotFoundPage() {
  return (
    <main className="notFoundPage">
      <h1 className="notFoundPage__error">404</h1>
      <p className="notFoundPage__text">Страница не найдена</p>
      <a className="notFoundPage__link-back" href="javascript:history.back()"> Назад </a>
    </main>
  );
}

export default NotFoundPage;