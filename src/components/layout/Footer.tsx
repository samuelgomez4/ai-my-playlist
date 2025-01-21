import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { AIMPLogo } from '../logo/AIMPLogo';

export function Footer({}) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <AIMPLogo className="w-14 h-14 mb-2" />
          <h3 className="text-2xl font-bold mb-2">AIMyPlaylist</h3>
          <p className="text-gray-400 text-center max-w-prose mb-6 text-pretty">
            Revolutionizing playlist creation with artificial intelligence, making music discovery
            effortless and personalized.
          </p>
        </div>
        <div className="flex justify-center items-center space-x-6 mb-8">
          <a
            href="https://github.com/samuelgomez4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors">
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://linkedin.com/in/samuelgomez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors">
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
        <div className="text-center text-gray-400">
          <p>Created by Samuel Gomez</p>
        </div>
      </div>
    </footer>
  );
}
