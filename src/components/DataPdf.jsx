import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',

  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const DataPdf = () => {
  return <Document>
    test
  </Document>
}

export default DataPdf;
