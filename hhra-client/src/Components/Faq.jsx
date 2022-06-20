import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion'

//var plus_icon = '<i className="fas fa-plus" data-position="top" data-delay="50" data-tooltip="Expand" />&nbsp;';


/*const Faq = () => {*/
export default class Faq extends Component {
  getIcon() {
    return (
      <i className="fas fa-plus" data-position="top" data-delay="50" data-tooltip="Expand">&nbsp;</i>
    );
  };

  render() {

    const plus_icon = this.getIcon();

    return (
      <div>

        <div className="col-md-12 col-xs-12 card">
          <div className="card-body">
            <h4 className="text-center g-pad-bottom">
              <i className="fas fa-question" data-position="top" data-delay="50" data-tooltip="Skills"></i> FAQ | Frequently Asked Questions
            </h4>

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>{plus_icon} What is Project COROMEC?</Accordion.Header>
                <Accordion.Body className="text-justify">
                  Project Coromec, registered under ClinicalTrials.Gov (NCT04678193),
                  is a IRB approved real-time COVID19 epidemiology registry aimed at assessing
                  the feasibility of monitoring enrolled subjects’ infection progress using the
                  Vitalbeat® digital therapeutics monitoring platform for remote patient monitoring
                  and integrated chronic disease management with mobile apps, AI-bots, IoT Wearables,
                  and cloud computing algorithms in collaboration with Intel Corp., clinicians and
                  scientists from Abrazo Health, Karolinska Institute, ASU College of Health Solutions,
                  and global collaborators.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>{plus_icon} Is it Safe and Secure?</Accordion.Header>
                <Accordion.Body className="text-justify">
                  Keeping global Health Data and Privacy in mind all data collection is electronically
                  de-identified and secured remotely with 256-bit encryption. Strict regional compliance is
                  followed to ensure regulatory requirements as approved by the IRB protocol registered at
                  <a href="http://www.clinicaltrials.gov" target="_blank">www.clinicaltrials.gov</a>.
                  Please visit the links for details on data safety and security
                  <a href="/GDPR" target="_blank">HIPAA, GDPR</a> and <a href="/privacy" target="_blank">Privacy Terms</a>.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

          </div>
        </div>


      </div>
    );
  }
}

