interface HomeProps {
  onBook: () => void;
}

export function Home({ onBook }: HomeProps) {
  return (
    <div className="hero">
      <h1>Онлайн-запись</h1>
      <p>Выберите заведение и запишитесь в 3 клика</p>
      <button className="btn btn-primary" onClick={onBook}>
        ✍️ Записаться
      </button>
    </div>
  );
}