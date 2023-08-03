/* eslint-disable react/prop-types */
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import BarDiagram from '../components/BarDiagram';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
  content: {
    fontSize: 12,
    marginBottom: 10,
  },
  chartContainer: {
    marginTop: 50,
    width: '100%',
    height: 300, // Set the desired height for the chart
  },
});

const PDFDocument = ({ subDivisionName, financialYear, param }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Comparison between parameters of a sub-division in a financial year</Text>
        <View style={styles.mainContainer}>
          <Text style={styles.content}>Sub-Divisions: {subDivisionName}</Text>
          <Text style={styles.content}>Financial year: {financialYear}</Text>
          <Text style={styles.content}>Selected parameter: {param}</Text>

          <View style={styles.chartContainer}>
            <BarDiagram subDivisionName={subDivisionName} financialYear={financialYear} param={param} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
