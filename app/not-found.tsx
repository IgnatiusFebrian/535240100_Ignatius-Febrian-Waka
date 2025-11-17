import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <h2 className="mb-4">Halaman Tidak Ditemukan</h2>
          <p className="lead mb-4">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Link href="/" className="btn btn-primary btn-lg me-md-2">
              Kembali ke Beranda
            </Link>
            <Link href="/checklist" className="btn btn-outline-primary btn-lg">
              Lihat Checklist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
