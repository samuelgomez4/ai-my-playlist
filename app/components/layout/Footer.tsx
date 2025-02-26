import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Footer({}) {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center items-center gap-6">
            <a
              href="https://github.com/samuelgomez4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors">
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com/in/samuel-gomez-suarez-0427321a4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
          <div className="text-center text-gray-400">
            <p>
              Created by{' '}
              <a
                href="https://samuel-gomez-suarez.vercel.app/"
                className="text-gray-200 hover:underline">
                Samuel Gomez
              </a>{' '}
              | {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
