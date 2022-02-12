import { Content } from 'carbon-components-react';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Content>{children}</Content>
    </>
  )
}