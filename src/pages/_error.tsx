import { NextPage, NextPageContext } from "next";
import Link from "next/link";

interface ErrorProps {
  statusCode: number;
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="error">
      <h1>404 - Page Not Found</h1>
      <p>The page you requested could not be found.</p>
      <p>Status code: {statusCode}</p>
      <Link href="/">
        Go to the homepage
      </Link>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode: statusCode || 404 };
};

export default ErrorPage;