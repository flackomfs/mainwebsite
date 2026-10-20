import React from 'react';
import { X, Calendar, MapPin, Phone, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import { HealthCenter } from '../types';

interface ClinicInfoModalProps {
  center: HealthCenter | null;
  onClose: () => void;
}

export const ClinicInfoModal: React.FC<ClinicInfoModalProps> = ({ center, onClose }) => {
  if (!center) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700">{center.barangay}</span>
            <h2 className="text-lg font-bold text-slate-900">{center.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{center.address}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="my-5 space-y-4 text-xs text-slate-600">
          <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block">Clinic Hours</span>
              <span className="font-bold text-slate-800">8:00 AM – 5:00 PM</span>
              <span className="block text-[11px] text-slate-500">Mon to Fri</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block">Direct Contact</span>
              <span className="font-bold text-slate-800">{center.contactNumber}</span>
              <span className="block text-[11px] text-slate-500">Emergency: (02) 8641-7890</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-2">What to Bring for Your Appointment:</h3>
            <ul className="space-y-1.5 text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Valid Government ID or Barangay Residency ID</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>PhilHealth ID / Member Data Record (MDR) if available</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Child Immunization Baby Book (for infants 0–12 months)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>OSCA Senior Citizen ID & Booklet (for maintenance meds)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <a
            href={center.urls.infoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Open Info Page &rarr;
          </a>
          <a
            href={center.urls.schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Go to Scheduling</span>
            <ExternalLink className="h-3 w-3 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
};
