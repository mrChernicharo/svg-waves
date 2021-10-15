import Head from 'next/head';
import Image from 'next/image';
import Canvas from '../components/Canvas';
import SEO from '../components/SEO/SEO';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <SEO />
      <h1>Make SVG Waves</h1>

      <Canvas />
    </div>
  );
}
